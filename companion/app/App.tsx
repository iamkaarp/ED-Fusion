import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import * as ScreenOrientation from "expo-screen-orientation"
import { useKeepAwake } from "expo-keep-awake"
import { useEffect } from "react"
import { io } from "socket.io-client"

import Companion from "./apis/Companion"

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
}

export default function App() {
  useKeepAwake()
  useEffect(() => {
    changeScreenOrientation()
  })

  const socket = io("http://192.168.0.143:4545")
  socket.on("connect", () => {
    console.log("connected")
    socket.on("config", (data) => {
      //console.log(data)
    })
    socket.on("status", (data) => {
      //console.log(data)
    })
  })

  const onPressHandler = () => {
    console.log("onPressHandler")
    socket.emit("hotkey", { key: "landingGear" })
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() => onPressHandler()}>
            <Text style={styles.text}>Hello</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
})
