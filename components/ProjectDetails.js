function renderProjectDetails(project) {
  // Find the main content container
  const mainContentArea = document.querySelector('.main-content-wrapper');
  if (!mainContentArea) {
    console.error('Main content area (.main-content-wrapper) not found.');
    return;
  }

  // Hide hero section
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.style.display = 'none';
  }

  // Hide all main sections first
  mainContentArea.querySelectorAll('section[id]').forEach(sec => {
    // Keep header visible, hide others
    if (sec.id !== 'hero') { // Assuming hero is outside main-content-wrapper or should persist
      sec.style.display = 'none';
    }
  });

  // Create a new section for the project details or find a dedicated one
  let detailSection = mainContentArea.querySelector('#project-detail-section');
  if (!detailSection) {
    detailSection = document.createElement('section');
    detailSection.id = 'project-detail-section';
    detailSection.className = 'project-detail scroll-reveal';
    mainContentArea.appendChild(detailSection);
  }
  
  // Add project-specific styles
  addProjectStyles();
  
  // Generate HTML based on project ID
  let projectHTML = '';
  
  // Select the appropriate detailed template based on project ID
  switch(project.id) {
    case 'yahtzee':
      projectHTML = renderYahtzeeProject(project);
      break;
    case 'transformers':
      projectHTML = renderTransformersProject(project);
      break;
    case 'platemath':
      projectHTML = renderPlateMathProject(project);
      break;
    default:
      projectHTML = renderDefaultProject(project);
  }
  
  detailSection.style.display = ''; // Make sure it's visible
  detailSection.innerHTML = projectHTML;
  
  // Scroll to the newly added/updated section
  detailSection.scrollIntoView({ behavior: 'smooth' });
  
  // Trigger scroll-reveal if used
  setTimeout(() => detailSection.classList.add('scrolled'), 100);
}

// Add necessary styles for project pages
function addProjectStyles() {
  // Check if styles already exist
  if (document.getElementById('project-detail-styles')) return;
  
  const styleEl = document.createElement('style');
  styleEl.id = 'project-detail-styles';
  styleEl.textContent = `
    .project-hero {
      height: 250px;
      display: flex;
      align-items: center;
      background-color: var(--bg-primary);
      position: relative;
      overflow: hidden;
      background: var(--gradient-background);
    }

    .project-hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, 
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 25, 50, 0.7) 50%,
          rgba(0, 0, 0, 0.8) 100%);
      z-index: 1;
    }

    .project-hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      width: 100%;
      padding: var(--spacing-lg);
      border-bottom: 3px solid var(--accent-primary);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .project-hero-content h1 {
      font-family: var(--font-display);
      font-size: 3rem;
      font-weight: 600;
      margin-bottom: var(--spacing-sm);
      color: var(--accent-primary);
      text-shadow: 0 0 15px rgba(0, 153, 255, 0.5);
      letter-spacing: 0.03em;
    }

    .project-hero-content h2 {
      font-family: var(--font-secondary);
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--text-secondary);
    }

    .project-details {
      padding: var(--spacing-xl) 0;
    }

    .project-section {
      margin-bottom: var(--spacing-xl);
    }

    .project-section h3 {
      font-size: 1.8rem;
      margin-bottom: var(--spacing-md);
      color: var(--accent-primary);
      font-family: var(--font-display);
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }

    .tech-item {
      background-color: rgba(0, 153, 255, 0.1);
      color: var(--accent-primary);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-md);
      font-family: var(--font-secondary);
    }

    .project-img {
      width: 100%;
      max-width: 700px;
      margin: var(--spacing-md) auto;
      display: block;
      border-radius: var(--border-radius-md);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .code-example {
      font-family: var(--font-code);
      background-color: rgba(15, 21, 32, 0.8);
      padding: 1.5rem;
      border-radius: var(--border-radius-md);
      margin: var(--spacing-md) 0;
      overflow-x: auto;
      border-left: 4px solid var(--accent-primary);
    }

    .back-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
      transition: color var(--transition-normal);
    }

    .back-button:hover {
      color: var(--accent-primary);
    }

    .project-actions {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    }

    .game-rules {
      background-color: rgba(15, 21, 32, 0.6);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      margin: var(--spacing-md) 0;
    }

    .game-rules h4 {
      color: var(--accent-primary);
      margin-bottom: var(--spacing-sm);
      font-family: var(--font-display);
    }

    .game-rules ul {
      margin-left: var(--spacing-md);
    }

    .game-rules li {
      margin-bottom: var(--spacing-xs);
      list-style-type: disc;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-md);
      margin-top: var(--spacing-md);
    }

    .feature-card {
      background-color: rgba(15, 21, 32, 0.6);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      border-top: 3px solid var(--accent-primary);
    }

    .feature-card h4 {
      font-family: var(--font-display);
      color: var(--accent-primary);
      margin-bottom: var(--spacing-sm);
      display: flex;
      align-items: center;
    }

    .feature-card h4 i {
      margin-right: var(--spacing-sm);
    }
    
    .research-paper {
      background-color: rgba(15, 21, 32, 0.6);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      margin: var(--spacing-lg) 0;
      border-left: 4px solid var(--accent-primary);
    }

    .paper-citation {
      font-style: italic;
      margin-top: var(--spacing-md);
      padding-top: var(--spacing-sm);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .model-diagram {
      background-color: rgba(15, 21, 32, 0.6);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      text-align: center;
      margin: var(--spacing-md) 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: var(--spacing-md) 0;
      background-color: rgba(15, 21, 32, 0.6);
      border-radius: var(--border-radius-md);
      overflow: hidden;
    }

    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    th {
      background-color: rgba(0, 153, 255, 0.1);
      color: var(--accent-primary);
      font-weight: 700;
    }

    tr:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  `;
  
  document.head.appendChild(styleEl);
}

// Render the Yahtzee project details
function renderYahtzeeProject(project) {
  return `
    <!-- PROJECT HERO -->
    <section class="project-hero">
      <div class="container">
        <div class="project-hero-content">
          <h1>${project.title}</h1>
          <h2>A Classic Dice Game Implementation</h2>
        </div>
      </div>
    </section>

    <!-- PROJECT DETAILS -->
    <section class="project-details">
      <div class="container">
        <a href="/" class="back-button">
          <i class="fas fa-arrow-left"></i> Back to Projects
        </a>

        <div class="project-section">
          <h3>Project Overview</h3>
          <p>Java Yahtzee is a text-based implementation of the classic dice game Yahtzee developed in Java. The game runs in the command line and features all official Yahtzee game rules and scoring combinations, demonstrating fundamental programming concepts and object-oriented design patterns.</p>
        </div>

        <div class="project-section">
          <h3>Game Features</h3>
          <div class="feature-grid">
            <div class="feature-card">
              <h4><i class="fas fa-dice"></i> Complete Yahtzee Rules</h4>
              <p>Implementation of all official Yahtzee scoring categories and game mechanics.</p>
            </div>
            <div class="feature-card">
              <h4><i class="fas fa-terminal"></i> Command Line Interface</h4>
              <p>Text-based interface with clear prompts and instructions for gameplay.</p>
            </div>
            <div class="feature-card">
              <h4><i class="fas fa-code"></i> OOP Design</h4>
              <p>Utilizes object-oriented programming principles and design patterns.</p>
            </div>
          </div>
        </div>

        <div class="project-section">
          <h3>Technologies Used</h3>
          <div class="tech-list">
            <span class="tech-item">Java</span>
            <span class="tech-item">Object-Oriented Programming</span>
            <span class="tech-item">Design Patterns</span>
            <span class="tech-item">Command Line I/O</span>
          </div>
        </div>

        <div class="project-section">
          <h3>Game Rules</h3>
          <div class="game-rules">
            <h4>How to Play Yahtzee</h4>
            <p>Yahtzee is a dice game where players roll five dice to make various combinations. Each player gets up to three rolls per turn to create the best possible combination.</p>
            
            <h4>Scoring Categories:</h4>
            <ul>
              <li><strong>Upper Section:</strong> Ones, Twos, Threes, Fours, Fives, Sixes</li>
              <li><strong>Lower Section:</strong> Three of a Kind, Four of a Kind, Full House, Small Straight, Large Straight, Yahtzee, Chance</li>
            </ul>
          </div>
        </div>

        <div class="project-section">
          <h3>Implementation Approach</h3>
          <p>The project features a clear separation of concerns between game logic and user interface components. Key design patterns include:</p>
          <ul>
            <li>Model-View-Controller pattern to separate game logic from user interface</li>
            <li>Strategy pattern for implementing different scoring calculations</li>
            <li>Command pattern for processing user inputs from the command line</li>
          </ul>
          <p>This structure made the code modular, maintainable, and easy to extend with additional features.</p>
        </div>

        <div class="project-section">
          <h3>Key Learnings</h3>
          <p>This project provided valuable experience with:</p>
          <ul>
            <li>Implementing complex game rules and validation logic</li>
            <li>Creating user-friendly command-line interfaces</li>
            <li>Applying design patterns to solve real-world programming problems</li>
            <li>Managing application state through object-oriented principles</li>
          </ul>
        </div>

        <div class="project-actions">
          <a href="${project.github_url}" class="btn primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
          </a>
        </div>
      </div>
    </section>
  `;
}

// Render the Transformers project details
function renderTransformersProject(project) {
  return `
    <!-- PROJECT HERO -->
    <section class="project-hero">
      <div class="container">
        <div class="project-hero-content">
          <h1>${project.title}</h1>
          <h2>NLP Translation Research Project</h2>
        </div>
      </div>
    </section>

    <!-- PROJECT DETAILS -->
    <section class="project-details">
      <div class="container">
        <a href="/" class="back-button">
          <i class="fas fa-arrow-left"></i> Back to Projects
        </a>

        <div class="project-section">
          <h3>Project Overview</h3>
          <p>This exploratory project implements a Jupyter notebook demonstration of transformer-based neural networks for English-to-Greek translation. The project showcases practical applications of NLP techniques to address the unique challenges of translating between languages with different alphabets and grammatical structures.</p>
          
          <div class="research-paper">
            <h4>Research Paper: "Transformer-Based Approaches to English-Greek Translation: Challenges and Optimizations"</h4>
            <p>This project accompanies a research paper that documents the methodologies, experiments, and findings from exploring transformer models for English-to-Greek translation.</p>
            <div class="project-actions" style="margin-top: var(--spacing-sm);">
              <a href="assets/documents/NLPPaper.pdf" class="btn primary" target="_blank">
                <i class="fas fa-file-pdf"></i> Download Research Paper
              </a>
            </div>
            <p class="paper-citation">Hayden, W. and Antoniadis, A. (2024). Transformer-Based Approaches to English-Greek Translation: Challenges and Optimizations. Unpublished manuscript.</p>
          </div>
        </div>

        <div class="project-section">
          <h3>Project Components</h3>
          <ul>
            <li>Jupyter notebook implementation of transformer models for translation</li>
            <li>Custom tokenization and data processing for Greek characters</li>
            <li>Training and evaluation procedures with sample datasets</li>
            <li>Visualization of model attention patterns and performance metrics</li>
          </ul>
        </div>

        <div class="project-section">
          <h3>Technologies & Methodologies</h3>
          <div class="tech-list">
            <span class="tech-item">Python</span>
            <span class="tech-item">Jupyter Notebook</span>
            <span class="tech-item">PyTorch</span>
            <span class="tech-item">Transformers</span>
            <span class="tech-item">Natural Language Processing</span>
          </div>
          <p>The project demonstrates the application of transformer architectures to neural machine translation, implementing models trained on parallel English-Greek corpora and evaluated using industry-standard metrics.</p>
        </div>

        <div class="project-section">
          <h3>Key Challenges & Solutions</h3>
          <p>Translating between English and Greek presents several unique challenges:</p>
          
          <table>
            <thead>
              <tr>
                <th>Challenge</th>
                <th>Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Different alphabets</td>
                <td>Custom tokenization strategy with special handling for Greek characters</td>
              </tr>
              <tr>
                <td>Complex Greek grammar with cases</td>
                <td>Expanded context window in attention mechanism</td>
              </tr>
              <tr>
                <td>Limited parallel training data</td>
                <td>Data augmentation and transfer learning from larger language models</td>
              </tr>
              <tr>
                <td>Word order differences</td>
                <td>Enhanced positional encoding and attention patterns</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="project-section">
          <h3>Results & Conclusions</h3>
          <p>The research demonstrated that transformer models can be effectively adapted for English-Greek translation with targeted modifications. The final model achieved BLEU scores competitive with commercial systems for this language pair, with particular improvements in handling Greek grammatical cases.</p>
          <p>Future work includes exploring larger models, incorporating linguistic features specific to Greek, and multi-task learning approaches combining translation with other NLP tasks.</p>
        </div>

        <div class="project-actions">
          <a href="${project.github_url}" class="btn primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
          </a>
          <a href="assets/documents/NLPPaper.pdf" class="btn secondary" target="_blank">
            <i class="fas fa-file-pdf"></i> Research Paper
          </a>
        </div>
      </div>
    </section>
  `;
}

// Render the PlateMath project details
function renderPlateMathProject(project) {
  return `
    <!-- PROJECT HERO -->
    <section class="project-hero">
      <div class="container">
        <div class="project-hero-content">
          <h1>${project.title}</h1>
          <h2>Powerlifting Assistant App</h2>
        </div>
      </div>
    </section>

    <!-- PROJECT DETAILS -->
    <section class="project-details">
      <div class="container">
        <a href="/" class="back-button">
          <i class="fas fa-arrow-left"></i> Back to Projects
        </a>

        <div class="project-section">
          <h3>Project Overview</h3>
          <p>PlateMath is a powerlifting training companion app built for iOS. It allows users to input their one-rep maxes for squat, bench, and deadlift, calculating Rate of Perceived Exertion (RPE) coefficients for various sets and reps. The app also displays an interactive barbell animation, helping lifters visualize exactly how to load plates for their working sets.</p>
        </div>

        <div class="project-section">
          <h3>Key Features</h3>
          <ul>
            <li>One-rep max tracking for the primary powerlifting movements</li>
            <li>RPE calculation based on weight, sets, and reps</li>
            <li>Barbell loading visualization with animated plate arrangement</li>
            <li>Support for both metric (kg) and imperial (lb) weight systems</li>
            <li>Clean, workout-friendly interface for quick access during training</li>
          </ul>
        </div>

        <div class="project-section">
          <h3>Technologies Used</h3>
          <div class="tech-list">
            <span class="tech-item">Swift</span>
            <span class="tech-item">SwiftUI</span>
            <span class="tech-item">iOS Development</span>
            <span class="tech-item">UI Animation</span>
          </div>
          <p>The application was built using Swift and SwiftUI, Apple's modern declarative UI framework, creating a responsive and visually appealing experience for iOS users.</p>
        </div>

        <div class="project-section">
          <h3>Implementation Details</h3>
          <p>The core functionality of PlateMath includes:</p>
          <ol>
            <li>Tracking one-rep max values for the major powerlifting movements</li>
            <li>Calculating working weights based on percentage of one-rep max</li>
            <li>Determining RPE (Rate of Perceived Exertion) values for different weight/rep combinations</li>
            <li>Visually representing barbell loading with a clean, animated interface</li>
          </ol>
          <p>SwiftUI's declarative approach allowed for creating an interface that's both visually appealing and responsive, with smooth animations for the barbell loading visualization.</p>
        </div>

        <div class="project-section">
          <h3>Key Learnings</h3>
          <p>This project provided valuable experience with building iOS applications using SwiftUI, implementing custom animations, and creating a genuinely useful tool for the powerlifting community. User feedback helped refine the interface to be practical during actual workout sessions.</p>
        </div>

        <div class="project-actions">
          <a href="${project.github_url}" class="btn primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
          </a>
        </div>
      </div>
    </section>
  `;
}

// Default project template for any other projects
function renderDefaultProject(project) {
  return `
    <div class="container">
      <h2 class="section-title">${project.title}</h2>
      <div class="project-detail-content" style="padding: 20px; background: var(--bg-secondary); border-radius: 8px; margin-top: 30px;">
         <p style="margin-bottom: 20px;">${project.description}</p>
         
         <div style="margin-bottom: 20px;">
             <strong>Tags:</strong> 
             <div class="project-tags" style="margin-top: 10px;">
                 ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
             </div>
         </div>

         <div class="project-links" style="margin-bottom: 20px;">
            ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="btn primary"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
         </div>
         
         <a href="/" class="btn secondary" style="margin-top: 30px;"> <i class="fas fa-arrow-left"></i> Back to Portfolio</a>
      </div>
    </div>
  `;
}

export default renderProjectDetails; 