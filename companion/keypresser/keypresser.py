from pynput.keyboard import Key, Controller
from playsound import playsound
import sys

keyCommands = {
  'win': Key.cmd,
  'ControlLeft': Key.ctrl_l,
  'ControlRight': Key.ctrl_r,
  'AltLeft': Key.alt_l,
  'AltRight': Key.alt_r,
  'ShiftLeft': Key.shift_l,
  'ShiftRight': Key.shift_r,
  'F1': Key.f1,
  'F2': Key.f2,
  'F3': Key.f3,
  'F4': Key.f4,
  'F5': Key.f5,
  'F6': Key.f6,
  'F7': Key.f7,
  'F8': Key.f8,
  'F9': Key.f9,
  'F10': Key.f10,
  'F11': Key.f11,
  'F12': Key.f12,
}

keyboard = Controller()
keyboard.press(keyCommands[sys.argv[1]])
keyboard.press(sys.argv[2])
keyboard.release(keyCommands[sys.argv[1]])
keyboard.release(sys.argv[2])
playsound('assets/sounds/button_press.wav')