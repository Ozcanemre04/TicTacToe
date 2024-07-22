import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent implements OnChanges {
  gameboardArray: string[] = ['', '', '', '', '', '', '', '', ''];
  winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winner: string = '';
  error: string = '';
  @Input() currentPlayer: string = '';
  @Output() sendCurrentPlayer: EventEmitter<string> = new EventEmitter();
  @Output() Sendwinner: EventEmitter<string> = new EventEmitter();

  VerifyTheWinner(value: string) {
    let win = this.winningCombo.map((win) =>
      win.every((index) => this.gameboardArray[index] === value)
    );
    if (win.some((x) => x === true)) {
      this.Sendwinner.emit((this.winner = value));
    } else if (this.gameboardArray.every((x) => x.length > 0)) {
      this.Sendwinner.emit((this.winner = 'tie'));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPlayer']) {
      this.VerifyTheWinner('X');
      this.VerifyTheWinner('O');
    }
  }

  getCurrentElement(e: number) {
    if (this.gameboardArray[e].length === 0 && this.winner.length === 0) {
      if (this.currentPlayer === 'X') {
        this.gameboardArray[e] = this.currentPlayer;
        this.sendCurrentPlayer.emit((this.currentPlayer = 'O'));
        this.error = '';
      } else {
        this.gameboardArray[e] = this.currentPlayer;
        this.sendCurrentPlayer.emit((this.currentPlayer = 'X'));
        this.error = '';
      }
    } else {
      this.error =
        'this index is already used or the game is over and you should restart';
      return;
    }
  }
}
