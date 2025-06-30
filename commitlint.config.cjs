module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [0, 'never'],
    'body-max-line-length': [0, 'never'],
    'header-max-length': [0, 'never'],
    'subject-max-length': [0, 'never'],
    
    'type-enum': [
      2,
      'always',
      [
        'feat',     // nueva funcionalidad
        'fix',      // corrección de bug
        'perf',     // mejora de rendimiento
        'refactor', // refactorización de código
        'style',    // cambios de estilo (CSS, UI)
        'docs',     // documentación
        'test',     // pruebas
        'chore',    // tareas de mantenimiento
        'ci',       // integración continua
        'build'     // construcción del proyecto
      ]
    ],
    
    'subject-empty': [2, 'never'],
    
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ]
  },
  
  helpUrl: 'https://github.com/conventional-commits/conventionalcommits.org',
  
  plugins: [
    {
      rules: {
        'spanish-commit': (parsed) => {
          const { subject } = parsed;
          if (!subject) return [true];
          
          const englishWords = ['add', 'fix', 'update', 'remove', 'improve', 'create', 'delete'];
          const foundEnglishWords = englishWords.filter(word => 
            subject.toLowerCase().includes(word)
          );
          
          if (foundEnglishWords.length > 0) {
            return [
              false,
              `El commit debe estar en español. Palabras en inglés encontradas: ${foundEnglishWords.join(', ')}`
            ];
          }
          
          return [true];
        }
      }
    }
  ]
} 