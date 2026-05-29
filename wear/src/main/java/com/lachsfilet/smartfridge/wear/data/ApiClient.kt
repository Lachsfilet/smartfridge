package com.lachsfilet.smartfridge.wear.data

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.decodeFromJsonElement
import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class ApiClient(
    private val baseUrl: String,
    private val json: Json = Json {
        ignoreUnknownKeys = true
        explicitNulls = false
    },
) {
    private val httpClient = HttpClient(OkHttp) {
        install(HttpTimeout) {
            requestTimeoutMillis = 10_000
            connectTimeoutMillis = 10_000
            socketTimeoutMillis = 10_000
        }
        install(ContentNegotiation) {
            json(json)
        }
        install(Logging) {
            logger = Logger.DEFAULT
            level = LogLevel.INFO
        }
    }

    suspend fun getAllDrinks(): List<DrinkItem> {
        val response = httpClient.get("${normalizedBaseUrl()}/api/trpc/drink.getAll")
        val payload: JsonElement = response.body()
        val dataJson = extractTrpcData(payload)
        return json.decodeFromJsonElement(dataJson)
    }

    suspend fun updateQuantity(id: Int, quantity: Int): DrinkItem {
        val response = httpClient.post("${normalizedBaseUrl()}/api/trpc/drink.updateQuantity") {
            contentType(ContentType.Application.Json)
            setBody(
                TrpcInputEnvelope(
                    json = buildJsonObject {
                        put("id", JsonPrimitive(id))
                        put("quantity", JsonPrimitive(quantity))
                    },
                ),
            )
        }

        val payload: JsonElement = response.body()
        return json.decodeFromJsonElement(extractTrpcData(payload))
    }

    suspend fun updateOpenedQuantity(id: Int, openedQuantity: Int): DrinkItem {
        val response =
            httpClient.post("${normalizedBaseUrl()}/api/trpc/drink.updateOpenedQuantity") {
                contentType(ContentType.Application.Json)
                setBody(
                    TrpcInputEnvelope(
                        json = buildJsonObject {
                            put("id", JsonPrimitive(id))
                            put("openedQuantity", JsonPrimitive(openedQuantity))
                        },
                    ),
                )
            }

        val payload: JsonElement = response.body()
        return json.decodeFromJsonElement(extractTrpcData(payload))
    }

    private fun normalizedBaseUrl(): String = baseUrl.trimEnd('/')

    private fun extractTrpcData(payload: JsonElement): JsonElement {
        val root = if (payload is JsonObject) payload else payload.jsonArray.first().jsonObject
        val result = root["result"]?.jsonObject
            ?: throw IllegalStateException("Missing tRPC result payload")
        val dataWrapper = result["data"]?.jsonObject
            ?: throw IllegalStateException("Missing tRPC data payload")
        return dataWrapper["json"] ?: JsonNull
    }
}

@Serializable
private data class TrpcInputEnvelope(
    val json: JsonElement,
)
