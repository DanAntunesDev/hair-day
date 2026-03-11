import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data minima comoo sendo a data atual.
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de carregar a pagina.
  event.preventDefault()

  try {
    // Recuperando o nome do cliente
    const name = clientName.value.trim() // Trim remove qualquer espaço digitado a mais

    if (!name) {
      return alert("Informe o nome do cliente!")
    }

    // Recupera o horario selecionado
    const hourSelected = document.querySelector(".hour-selected")

    // Recupera o horario selecionado
    if (!hourSelected) {
      return alert("Selecione a hora.")
    }

    // Recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":")

    // Insere a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour")

    // Gera um ID
    const id = new Date().getTime()

    await scheduleNew({
      id,
      name,
      when,
    })

  } catch (error) {
    alert("Não foi possivel realizar o agendamento.")
    console.log(error)
  }
}