bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    basic.pause(5000)
    basic.clearScreen()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    basic.pause(5000)
    basic.clearScreen()
})
let rclick = false
let hold = false
let click = false
let valor: number = 0
HX711.SetPIN_DOUT(DigitalPin.P1)
HX711.SetPIN_SCK(DigitalPin.P2)
HX711.begin()
serial.setBaudRate(BaudRate.BaudRate115200)
let inidata = HX711.read()
mouse.startMouseService()
basic.showIcon(IconNames.Heart)
basic.pause(5000)
basic.clearScreen()
basic.forever(function () {
    valor = Math.round(Math.map(HX711.read() - inidata, -160000000, 160000000, -1000, 1000))
    serial.writeString("One Reading: ")
    serial.writeNumber(valor)
    serial.writeLine("" + (0))
    if (valor > 100) {
        click = true
        hold = true
        basic.showString("L")
    } else if (valor < -10) {
        rclick = true
        basic.showString("R")
    } else {
        rclick = false
        hold = false
        click = false
        basic.clearScreen()
    }
    mouse.send(
    0,
    0,
    click,
    false,
    rclick,
    0,
    hold
    )
    basic.pause(200)
})
