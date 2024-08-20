import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent {
  output: string[] = [];
  currentCommand: string = '';
  currentSection: string = '';
  showPrompt: boolean = true;
  isMaximized: boolean = false;
  isMinimized: boolean = false;
  isMinimizing: boolean = false;
  isShaking: boolean = false;
  // @ViewChild('inputField', { static: false }) inputField!: ElementRef;
  @ViewChild('inputField') inputField!: ElementRef;

  ngOnInit() {
    this.displayWelcomeMessage();
  }
  focusInput(): void {
    this.inputField.nativeElement.focus()
  }
  handleInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.processCommand(this.currentCommand);
      this.currentCommand = '';
    }
  }

  processCommand(command: string) {
    this.output.push(`$ ${command}`);

    switch (command) {
      case 'help':
        this.output.push(
          'Available commands: ' +
            '<span class="red">about</span>&nbsp;&nbsp;' +
            '<span class="green">projects</span>&nbsp;&nbsp;' +
            '<span class="blue">skills</span>&nbsp;&nbsp;' +
            '<span class="yellow">contact</span>'
        );
        break;
      case 'about':
        this.currentSection = 'about';
        this.showPrompt = true;
        break;
      case 'projects':
        this.currentSection = 'projects';
        this.showPrompt = true;
        break;
      case 'skills':
        this.currentSection = 'skills';
        this.showPrompt = true;
        break;
      case 'contact':
        this.currentSection = 'contact';
        this.showPrompt = true;
        break;
      case 'clear':
        this.output = [];
        this.displayWelcomeMessage();
        this.currentSection = '';
        this.showPrompt = true;
        break;
      default:
        this.output.push(
          `Command not found: ` + ' ' + `<span class="red">${command}</span>`
        );
    }
  }

  displayWelcomeMessage() {
    this.output.push('👋 Welcome to My Portfolio!');
    this.output.push(
      'Type' + ' ' + '<span class="red">help</span> to see available commands'
    );
    this.output.push("🚀 Let's explore!");
  }

  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
    this.isMinimized = false; 

  }

  toggleMinimize(): void {
    this.isMinimizing = true;

    setTimeout(() => {
      this.isMinimized = true;
      this.isMinimizing = false;
    }, 300);
  }

  minimizeTerminal(): void {
    this.toggleMinimize();
  }
  maximizeTerminal(): void {
    this.toggleMaximize();
  }

  shakeTerminal(): void {
    if (!this.isShaking) {
      this.isShaking = true;

      // Remove the shake class after the animation is done
      setTimeout(() => {
        this.isShaking = false;
      }, 500); // Match this with the shake animation duration

      this.output.push('<span class="close">Why are you trying to close?</span>' + '<br>' + '<span class="close">Does this look like a real terminal to you?🙄🙄🙄🙄</span>');
    }
  }
}
