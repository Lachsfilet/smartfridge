package com.lachsfilet.smartfridge.wear.data

import kotlinx.serialization.Serializable

@Serializable
data class DrinkItem(
    val id: Int,
    val name: String,
    val quantity: Int,
    val openedQuantity: Int,
)
