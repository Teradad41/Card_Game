import { STARTPAGE } from '../config'
import { MainView } from './MainView'
import { Controller } from '../controllers/Controllers'
import { Player } from '../models/Player'

export class StartView {
  public static render(): void {
    if (!STARTPAGE) return

    MainView.displayBlock(STARTPAGE)
    STARTPAGE.innerHTML = `
        <div class="background-container flex items-center justify-center">
            <form class="startGameForm">
                <div class="mb-4">
                    <label class="block mb-2 font-bold text-white text-xl">NAME</label>
                    <input class="w-full px-3 py-2 border rounded-xl focus:outline-green-600 shadow-xl"
                        id="userName"
                        type="text"
                        placeholder="Name"
                        required
                    >
                </div>
                <div class="mb-9">
                    <label class="block mb-2 font-bold text-white text-xl">GAME</label>
                    <select class="w-full px-3 py-3 border rounded-xl focus:outline-green-600 shadow-xl" id="gameType">
                        <option value="blackjack">BlackJack</option>
                        <option value="porker" disabled>Porker - coming soon -</option>
                    </select>
                </div>
                <button id="startBtn" class="w-full mt-3 px-4 py-3 font-bold text-white bg-green-600 rounded-xl hover:bg-green-500 shadow-xl transition-colors duration-300"
                    type="submit">
                    START GAME
                </button>
            </form>
        </div>
      `

    // Game Start
    STARTPAGE?.querySelector('.startGameForm')!.addEventListener('submit', (e) => {
      e.preventDefault()
      const userNameInput = STARTPAGE?.querySelector('#userName') as HTMLInputElement
      const gameTypeInput = STARTPAGE?.querySelector('#gameType') as HTMLSelectElement

      if (STARTPAGE) {
        MainView.displayNone(STARTPAGE)

        const bot1: Player = new Player('BOT1', 'ai', gameTypeInput.value)
        const player: Player = new Player(userNameInput.value, 'user', gameTypeInput.value)
        const bot2: Player = new Player('BOT2', 'ai', gameTypeInput.value)

        Controller.startBlackJack([bot1, player, bot2])
      }
    })
  }
}
