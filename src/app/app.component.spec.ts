import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, GameboardComponent],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // winner test
  it('should give empty winner ', () => {
    const app = fixture.componentInstance;
    expect(app.winner).toBe('');
  });
  // randomValue function test
  it('should give random number between 0 and 1', () => {
    const app = fixture.componentInstance;
    spyOn(app, 'randomValue').and.returnValues(0, 1);
    expect(app.randomValue()).toBe(0);
    expect(app.randomValue()).toBe(1);
  });
  // handlestartgame function test
  it('should set currentPlayer to X when random value is 0', () => {
    spyOn(component, 'randomValue').and.returnValues(0);
    component.handleStartGame();
    expect(component.currentPlayer).toEqual('X');
  });

  it('should set currentPlayer to  O when random value is 1', () => {
    spyOn(component, 'randomValue').and.returnValues(1);
    component.handleStartGame();
    expect(component.currentPlayer).toEqual('O');
  });
  // getwinner function test
  it('should call getwinner and set winner to X ', () => {
    component.getWinner('X');
    fixture.detectChanges();
    expect(component.winner).toBe('X');
  });

  it('should call getwinner and set winner to O ', () => {
    component.getWinner('O');
    fixture.detectChanges();
    expect(component.winner).toBe('O');
  });

  it('should call getwinner and set winner to tie ', () => {
    component.getWinner('tie');
    fixture.detectChanges();
    expect(component.winner).toBe('tie');
  });
  // getcurrentplayer function test
  it('should call getcurrentplayer and set currentplayer to X ', () => {
    component.getCurrentPlayer('X');
    fixture.detectChanges();
    expect(component.currentPlayer).toBe('X');
  });
  it('should call getcurrentplayer and set currentplayer to O ', () => {
    component.getCurrentPlayer('O');
    fixture.detectChanges();
    expect(component.currentPlayer).toBe('O');
  });
  // conditional rendering ui test
  it('should show restart button and dont show b tag if winner is tie', () => {
    component.winner = 'tie';
    fixture.detectChanges();
    const refresh: HTMLElement = compiled.querySelector('#restart')!;
    const B_tag: HTMLElement = compiled.querySelector('b')!;
    expect(B_tag).toBeFalsy();
    expect(refresh).toBeTruthy();
    expect(refresh.textContent).toBe('restart');
  });
  //winner
  it('should show b tag if winner is X', () => {
    component.winner = 'X';
    fixture.detectChanges();
    const B_Tag: HTMLElement = compiled.querySelector('b')!;
    const refresh: HTMLElement = compiled.querySelector('#restart')!;
    expect(B_Tag).toBeTruthy();
    expect(B_Tag.textContent).toBe('player X won');
    expect(refresh).toBeTruthy();
  });

  it('should show b tag if winner is O', () => {
    component.winner = 'O';
    fixture.detectChanges();
    const B_Tag: HTMLElement = compiled.querySelector('b')!;
    const refresh: HTMLElement = compiled.querySelector('#restart')!;
    expect(B_Tag).toBeTruthy();
    expect(B_Tag.textContent).toBe('player O won');
    expect(refresh).toBeTruthy();
  });
});
