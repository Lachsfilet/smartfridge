package com.lachsfilet.smartfridge.wear.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.lachsfilet.smartfridge.wear.BuildConfig
import com.lachsfilet.smartfridge.wear.data.ApiClient
import com.lachsfilet.smartfridge.wear.data.DrinkItem
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class SmartFridgeUiState(
    val drinks: List<DrinkItem> = emptyList(),
    val isLoading: Boolean = true,
    val isRefreshing: Boolean = false,
    val errorMessage: String? = null,
    val totalBottleCount: Int = 0,
    val estimatedPfandEur: Double = 0.0,
)

class SmartFridgeViewModel(
    private val apiClient: ApiClient = ApiClient(BuildConfig.API_BASE_URL),
) : ViewModel() {

    private val _uiState = MutableStateFlow(SmartFridgeUiState())
    val uiState: StateFlow<SmartFridgeUiState> = _uiState.asStateFlow()

    init {
        refresh()
        startPolling()
    }

    fun refresh() {
        viewModelScope.launch {
            _uiState.update { current ->
                current.copy(
                    isLoading = current.drinks.isEmpty(),
                    isRefreshing = current.drinks.isNotEmpty(),
                    errorMessage = null,
                )
            }

            runCatching { apiClient.getAllDrinks() }
                .onSuccess { drinks ->
                    _uiState.value = buildState(drinks)
                }
                .onFailure { throwable ->
                    _uiState.update { current ->
                        current.copy(
                            isLoading = false,
                            isRefreshing = false,
                            errorMessage = throwable.message ?: "Network error",
                        )
                    }
                }
        }
    }

    fun increaseClosed(drinkId: Int) = mutateOptimistically(drinkId, quantityDelta = 1, openedDelta = 0)

    fun decreaseClosed(drinkId: Int) = mutateOptimistically(drinkId, quantityDelta = -1, openedDelta = 0)

    fun markAsOpened(drinkId: Int) = mutateOptimistically(drinkId, quantityDelta = -1, openedDelta = 1)

    private fun mutateOptimistically(drinkId: Int, quantityDelta: Int, openedDelta: Int) {
        val before = _uiState.value.drinks
        val updated = before.map { drink ->
            if (drink.id != drinkId) return@map drink

            val newQuantity = (drink.quantity + quantityDelta).coerceAtLeast(0)
            val newOpened = (drink.openedQuantity + openedDelta).coerceIn(0, newQuantity)
            drink.copy(quantity = newQuantity, openedQuantity = newOpened)
        }

        if (before == updated) return

        _uiState.value = buildState(updated)

        val changed = updated.firstOrNull { it.id == drinkId } ?: return

        viewModelScope.launch {
            runCatching {
                apiClient.updateQuantity(changed.id, changed.quantity)
                apiClient.updateOpenedQuantity(changed.id, changed.openedQuantity)
            }.onFailure { throwable ->
                _uiState.value = buildState(before).copy(
                    errorMessage = throwable.message ?: "Update failed, reverted",
                )
            }
        }
    }

    private fun startPolling() {
        viewModelScope.launch {
            while (true) {
                delay(60_000)
                refresh()
            }
        }
    }

    private fun buildState(drinks: List<DrinkItem>) = SmartFridgeUiState(
        drinks = drinks,
        isLoading = false,
        isRefreshing = false,
        errorMessage = null,
        totalBottleCount = drinks.sumOf { it.quantity + it.openedQuantity },
        estimatedPfandEur = drinks.sumOf { (it.quantity + it.openedQuantity) * PFAND_PER_BOTTLE_EUR },
    )

    private companion object {
        private const val PFAND_PER_BOTTLE_EUR = 0.25
    }
}
