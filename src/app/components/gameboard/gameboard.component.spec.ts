import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameboardComponent } from './gameboard.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameboardComponent],
    });
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // empty gameboardArray
  it('should have array with empty value', () => {
    const gameboard = component.gameboardArray;
    expect(gameboard).toEqual(['', '', '', '', '', '', '', '', '']);
  });
  // empty winner
  it('should return empty winner', () => {
    expect(component.winner).toEqual('');
  });
  // getcurrentElement
  it('should return currentplayer O after getcurrentElement gets called', () => {
    component.currentPlayer = 'X';
    spyOn(component.sendCurrentPlayer, 'emit');
    component.getCurrentElement(0);
    fixture.detectChanges();
    expect(component.gameboardArray[0]).toBe('X');
    expect(component.sendCurrentPlayer.emit).toHaveBeenCalledWith('O');
    expect(component.currentPlayer).toEqual('O');
  });

  it('should return currentplayer X after getcurrentElement gets called', () => {
    component.currentPlayer = 'O';
    spyOn(component.sendCurrentPlayer, 'emit');
    component.getCurrentElement(1);
    fixture.detectChanges();
    expect(component.gameboardArray[1]).toBe('O');
    expect(component.sendCurrentPlayer.emit).toHaveBeenCalledWith('X');
    expect(component.currentPlayer).toEqual('X');
  });
  // getcurrentElement index already used error
  it('should return error message after getcurrentElement gets called 2time in same index', () => {
    component.currentPlayer = 'O';
    component.gameboardArray = ['', 'X', '', '', '', '', '', '', ''];
    component.getCurrentElement(1);
    fixture.detectChanges();
    expect(component.gameboardArray[1]).not.toBe('O');
    expect(component.error).toBe(
      'this index is already used or the game is over and you should restart'
    );
    expect(compiled.querySelector('.error')).toBeTruthy();
    expect(compiled.querySelector('.error').textContent).toBe(
      'this index is already used or the game is over and you should restart'
    );
    component.getCurrentElement(2);
    fixture.detectChanges();
    expect(component.error).toBe('');
    expect(component.currentPlayer).toBe('X');
  });
  // getcurrentElement game is over error
  it('should return error message after getcurrentElement gets called and the game is over', () => {
    component.currentPlayer = 'O';
    component.winner = 'X';
    component.getCurrentElement(1);
    fixture.detectChanges();
    expect(component.gameboardArray[1]).not.toBe('O');
    expect(component.error).toBe(
      'this index is already used or the game is over and you should restart'
    );
    expect(compiled.querySelector('.error')).toBeTruthy();
    expect(compiled.querySelector('.error').textContent).toBe(
      'this index is already used or the game is over and you should restart'
    );
  });

  //verify winner
  it('should identify a winner (X) for a winning combination', () => {
    component.gameboardArray = ['X', 'X', 'X', '', '', '', '', '', ''];
    spyOn(component.Sendwinner, 'emit');
    component.VerifyTheWinner('X');
    fixture.detectChanges();
    expect(component.Sendwinner.emit).toHaveBeenCalledWith('X');
    expect(component.winner).toBe('X');
  });

  it('should identify a winner (O) for a winning combination', () => {
    component.gameboardArray = ['O', '', '', '', 'O', '', '', '', 'O'];
    spyOn(component.Sendwinner, 'emit');
    component.VerifyTheWinner('O');
    fixture.detectChanges();
    expect(component.Sendwinner.emit).toHaveBeenCalledWith('O');
    expect(component.winner).toBe('O');
  });

  it('should identify a tie when all cells are filled but no winner', () => {
    component.gameboardArray = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    spyOn(component.Sendwinner, 'emit');
    component.VerifyTheWinner('O');
    fixture.detectChanges();
    expect(component.Sendwinner.emit).toHaveBeenCalledWith('tie');
    expect(component.winner).toBe('tie');
  });
});
