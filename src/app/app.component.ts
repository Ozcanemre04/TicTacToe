import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentPlayer: string = '';
  AllPlayers: string[] = ['X', 'O'];
  winner: string = '';

  constructor() {}
  ngOnInit(): void {
    this.handleStartGame();
  }

  getCurrentPlayer(value: string) {
    this.currentPlayer = value;
  }
  getWinner(winner: string) {
    this.winner = winner;
  }

  handleRestart() {
    window.location.reload();
  }
  handleStartGame() {
    this.currentPlayer = this.AllPlayers[this.randomValue()];
  }

  randomValue(): number {
    return Math.floor(Math.random() * 2);
  }
}
