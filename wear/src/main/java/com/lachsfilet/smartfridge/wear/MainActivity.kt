package com.lachsfilet.smartfridge.wear

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.wear.compose.foundation.lazy.ScalingLazyColumn
import androidx.wear.compose.foundation.lazy.items
import androidx.wear.compose.material.Button
import androidx.wear.compose.material.Card
import androidx.wear.compose.material.CardDefaults
import androidx.wear.compose.material.Chip
import androidx.wear.compose.material.ChipDefaults
import androidx.wear.compose.material.Text
import com.lachsfilet.smartfridge.wear.data.DrinkItem
import com.lachsfilet.smartfridge.wear.viewmodel.SmartFridgeViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SmartFridgeWatchApp()
        }
    }
}

@Composable
fun SmartFridgeWatchApp(viewModel: SmartFridgeViewModel = viewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black),
        contentAlignment = Alignment.Center,
    ) {
        when {
            state.isLoading -> LoadingScreen()
            state.errorMessage != null && state.drinks.isEmpty() -> ErrorScreen(
                message = state.errorMessage.orEmpty(),
                onRetry = viewModel::refresh,
            )

            else -> ScalingLazyColumn(
                modifier = Modifier.fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                item {
                    Card(
                        onClick = viewModel::refresh,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 8.dp, vertical = 4.dp),
                        backgroundPainter = CardDefaults.cardBackgroundPainter(startBackgroundColor = Color(0xFF121212)),
                    ) {
                        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(text = "SmartFridge", color = Color.White)
                            Text(text = "Inventory: ${state.totalBottleCount}", color = Color.LightGray)
                            Text(
                                text = "Pfand: €${"%.2f".format(state.estimatedPfandEur)}",
                                color = Color(0xFF8BC34A),
                            )
                            if (state.isRefreshing) {
                                Text(text = "Syncing…", color = Color.Gray)
                            }
                        }
                    }
                }

                items(state.drinks, key = { it.id }) { drink ->
                    DrinkCard(
                        drink = drink,
                        onIncrease = { viewModel.increaseClosed(drink.id) },
                        onDecrease = { viewModel.decreaseClosed(drink.id) },
                        onMarkOpened = { viewModel.markAsOpened(drink.id) },
                    )
                }

                if (state.errorMessage != null) {
                    item {
                        Text(
                            text = state.errorMessage.orEmpty(),
                            color = Color(0xFFFF8A80),
                            modifier = Modifier.padding(8.dp),
                            textAlign = TextAlign.Center,
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun DrinkCard(
    drink: DrinkItem,
    onIncrease: () -> Unit,
    onDecrease: () -> Unit,
    onMarkOpened: () -> Unit,
) {
    Card(
        onClick = onMarkOpened,
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 4.dp),
        backgroundPainter = CardDefaults.cardBackgroundPainter(startBackgroundColor = Color(0xFF1A1A1A)),
    ) {
        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(text = drink.name, color = Color.White)
            Text(text = "Closed: ${drink.quantity}  Opened: ${drink.openedQuantity}", color = Color.LightGray)

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterHorizontally),
            ) {
                Button(onClick = onDecrease, enabled = drink.quantity > 0) { Text("-") }
                Button(onClick = onIncrease) { Text("+") }
            }

            Chip(
                onClick = onMarkOpened,
                enabled = drink.quantity > 0,
                label = { Text("Mark as Opened") },
                colors = ChipDefaults.secondaryChipColors(backgroundColor = Color(0xFF263238)),
            )
        }
    }
}

@Composable
fun LoadingScreen() {
    Text(
        text = "Loading drinks…",
        color = Color.White,
        modifier = Modifier.padding(16.dp),
        textAlign = TextAlign.Center,
    )
}

@Composable
fun ErrorScreen(message: String, onRetry: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.padding(12.dp),
    ) {
        Text(text = "Sync failed", color = Color(0xFFFF8A80), textAlign = TextAlign.Center)
        Text(text = message, color = Color.LightGray, textAlign = TextAlign.Center)
        Button(onClick = onRetry) { Text("Retry") }
    }
}
