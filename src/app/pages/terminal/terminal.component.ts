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
    this.inputField.nativeElement.focus();
  }
  handleInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.processCommand(this.currentCommand);
      this.currentCommand = '';
    }
  }
  processCommand(command: string) {
    this.output.push(`$ ${command}`);
  
    const commands: { [key: string]: () => void } = {
      help: () => {
        this.output.push(
          '<br>Available commands: ' +
            '<span class="red">about</span>&nbsp;&nbsp;' +
            '<span class="blue">skills</span>&nbsp;&nbsp;' +
            '<span class="green">contact</span>&nbsp;&nbsp;'
        );
      },
      about: () => {
        this.currentSection = 'about';
        this.output.push(
          '<br><span class="red">About Me:</span><br><br>' +
            'I am a dedicated software developer with ' +
            '<span class="blue">four</span> ' +
            'years of experience specializing in mobile and web applications, with a strong focus on frontend development. My journey in the tech industry has equipped me with the skills to create intuitive and engaging user interfaces that deliver seamless user experiences.<br><br>' +
            "Recently, I've expanded my expertise to include" + " <span class='blue'>backend development,</span> " + "and I'm passionate about exploring this area further. My commitment to continuous learning and improvement drives me to stay updated with the latest industry trends and technologies, ensuring that I can contribute effectively to any project.<br><br>" +
            "Whether working on the frontend or diving into backend challenges, I bring enthusiasm and a problem-solving mindset to every task. I'm excited about the opportunities to create impactful software solutions that make a difference."
        );
        this.showPrompt = true;
      },
      skills: () => {
        this.currentSection = 'skills';
        this.output.push(
          '<br><span class="red">My Skills:</span><br><br>' +
            'I possess a well-rounded skill set that spans across frontend, backend, and UI development. My expertise lies in creating visually appealing and highly functional user interfaces, as well as developing robust backend systems.<br><br>' +
            '<strong class="blue">Frontend:</strong> I excel in building dynamic and responsive web applications using frameworks like Angular and React. I also have experience in mobile development with React Native (Expo) and Flutter, which allows me to deliver cross-platform solutions with a consistent user experience.<br><br>' +
            '<strong class="blue">Backend:</strong> My backend development skills include working with Go, where I create scalable and efficient server-side applications. I am proficient in JavaScript and TypeScript, enabling me to write clean, maintainable code across both frontend and backend environments.<br><br>' +
            '<strong class="blue">UI Development:</strong> I am passionate about crafting intuitive and engaging user interfaces. My UI skills are complemented by a deep understanding of UX principles, ensuring that the applications I build are not only functional but also user-friendly.<br><br>' +
            '<strong class="blue">Languages & Tools:</strong><br>' +
            '- <strong>Languages:</strong> Go, JavaScript, TypeScript<br>' +
            '- <strong>Frontend Frameworks:</strong> Angular, React<br>' +
            '- <strong>Mobile Frameworks:</strong> React Native (Expo), Flutter<br>' +
            '- <strong>Database:</strong> PostgreSQL, Firestore<br>' +
            '- <strong>UI:</strong> Figma, Adobe XD'
        );
        this.showPrompt = true;
      },
      contact: () => {
        this.currentSection = 'contact';
        this.output.push(
          '<br><span class="green">Contact:</span><br>' +
            'Feel free to connect with me on GitHub, LinkedIn, or via email and phone. I\'m always open to discussing new opportunities, collaborations, or simply sharing insights.<br><br>' +
            '<img src="../../../assets/github.png" alt="GitHub" width="16"/> ' +
            '<a href="https://github.com/mcbryan1/" target="_blank">GitHub</a><br>' +
            '<img src="../../../assets/linkedin.png" alt="LinkedIn" width="16"/> ' +
            '<a href="https://www.linkedin.com/in/solomon-sackey-a7b605190/?original_referer=" target="_blank">LinkedIn</a><br>' +
            '<img src="../../../assets/email.png" alt="Email" width="16"/> ' +
            '<a href="mailto:solomontetteh.st@outlook.com">solomontetteh.st@outlook.com</a><br>' +
            '<img src="../../../assets/phone.png" alt="Phone" width="16"/> ' +
            '+233 55 453 6187'
        );
        this.showPrompt = true;
      },
      clear: () => {
        this.output = [];
        this.displayWelcomeMessage();
        this.currentSection = '';
        this.showPrompt = true;
      },
      default: () => {
        this.output.push(
          `Command not found: ` + ' ' + `<span class="red">${command}</span>`
        );
      },
    };
  
    (commands[command] || commands['default'])();
  }
  
  // processCommand(command: string) {
  //   this.output.push(`$ ${command}`);

  //   switch (command) {
  //     case 'help':
  //       this.output.push(
  //         '<br>Available commands: ' +
  //           '<span class="red">about</span>&nbsp;&nbsp;' +
  //           '<span class="blue">skills</span>&nbsp;&nbsp;' +
  //           '<span class="green">contact</span>&nbsp;&nbsp;' 
  //           // '<span class="yellow">contact</span>'
  //       );
  //       break;
  //     case 'about':
  //       this.currentSection = 'about';
  //       this.output.push(
  //         '<br><span class="red">About Me:</span><br>' +
  //           'I am a dedicated software developer with ' +
  //           '<span class="red">four</span> ' +
  //           'years of experience specializing in mobile and web applications, with a strong focus on frontend development. My journey in the tech industry has equipped me with the skills to create intuitive and engaging user interfaces that deliver seamless user experiences.<br><br>' +
  //           "Recently, I've expanded my expertise to include" + " <span class='red'>backend development,</span> " + "and I'm passionate about exploring this area further. My commitment to continuous learning and improvement drives me to stay updated with the latest industry trends and technologies, ensuring that I can contribute effectively to any project.<br><br>" +
  //           "Whether working on the frontend or diving into backend challenges, I bring enthusiasm and a problem-solving mindset to every task. I'm excited about the opportunities to create impactful software solutions that make a difference."
  //       );
  //       this.showPrompt = true;
  //       break;
  //     // case 'projects':
  //     //   this.currentSection = 'projects';
  //     //   this.showPrompt = true;
  //     //   break;
  //     case 'skills':
  //       this.currentSection = 'skills';
  //       this.output.push(
  //         '<br><span class="blue">Skills:</span><br>' +
  //           'I possess a well-rounded skill set that spans across frontend, backend, and UI development. My expertise lies in creating visually appealing and highly functional user interfaces, as well as developing robust backend systems.<br><br>' +
  //           '<strong class="class_bold">Frontend:</strong> I excel in building dynamic and responsive web applications using frameworks like Angular and React. I also have experience in mobile development with React Native (Expo) and Flutter, which allows me to deliver cross-platform solutions with a consistent user experience.<br><br>' +
  //           '<strong class="class_bold">Backend:</strong> My backend development skills include working with Go, where I create scalable and efficient server-side applications. I am proficient in JavaScript and TypeScript, enabling me to write clean, maintainable code across both frontend and backend environments.<br><br>' +
  //           '<strong class="class_bold">UI Development:</strong> I am passionate about crafting intuitive and engaging user interfaces. My UI skills are complemented by a deep understanding of UX principles, ensuring that the applications I build are not only functional but also user-friendly.<br><br>' +
  //           '<strong class="class_bold">Languages & Tools:</strong><br>' +
  //           '- <strong>Languages:</strong> Go, JavaScript, TypeScript<br>' +
  //           '- <strong>Frontend Frameworks:</strong> Angular, React<br>' +
  //           '- <strong>Mobile Frameworks:</strong> React Native (Expo), Flutter<br>' +
  //           '- <strong>Database:</strong> PostgreSQL, Firestore<br>' +
  //           '- <strong>UI:</strong> FIgma, Adobe XD'
  //       );
  //       this.showPrompt = true;
  //       break;
  //     case 'contact':
  //       this.currentSection = 'contact';
  //       this.output.push(
  //         '<br><span class="green">Contact:</span><br>' +
  //           'Feel free to connect with me on GitHub, LinkedIn, or via email and phone. I\'m always open to discussing new opportunities, collaborations, or simply sharing insights.<br><br>' +
  //           '<img src="../../../assets/github.png" alt="GitHub" width="16"/> ' +
  //           '<a href="https://github.com/mcbryan1/" target="_blank">GitHub</a><br>' +
  //           '<img src="../../../assets/linkedin.png" alt="LinkedIn" width="16"/> ' +
  //           '<a href="https://www.linkedin.com/in/solomon-sackey-a7b605190/?original_referer=" target="_blank">LinkedIn</a><br>' +
  //           '<img src="../../../assets/email.png" alt="Email" width="16"/> ' +
  //           '<a href="mailto:solomontetteh.st@outlook.com">solomontetteh.st@outlook.com</a><br>' +
  //           '<img src="../../../assets/phone.png" alt="Phone" width="16"/> ' +
  //           '+233 55 453 6187'
  //       );        
  //       this.showPrompt = true;
  //       break;
  //     case 'clear':
  //       this.output = [];
  //       this.displayWelcomeMessage();
  //       this.currentSection = '';
  //       this.showPrompt = true;
  //       break;
  //     default:
  //       this.output.push(
  //         `Command not found: ` + ' ' + `<span class="red">${command}</span>`
  //       );
  //   }
  // }

  displayWelcomeMessage() {
    this.output.push('👋 Welcome to My Portfolio!');
    this.output.push(
      'Type' + ' ' + '<span class="red">help</span> to see available commands, ' + 
      '<span class="red">clear</span> to clear the termainal'
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

      this.output.push(
        '<span class="close">Why are you trying to close?</span>' +
          '<br>' +
          '<span class="close">Does this look like a real terminal to you?🙄🙄🙄🙄</span>'
      );
    }
  }
}
