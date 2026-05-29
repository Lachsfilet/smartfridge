# Keep Kotlin serialization models used by Ktor JSON parsing
-keepclassmembers class ** {
    @kotlinx.serialization.Serializable *;
}
