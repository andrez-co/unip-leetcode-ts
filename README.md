# Country Quiz - UNIP

Aplicacion React + TypeScript construida con Vite para el reto Country Quiz. El proyecto consume datos de Rest Countries, genera preguntas sobre capitales y permite responder un cuestionario con feedback inmediato.

## Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Vitest + Testing Library
- ESLint

## Funcionalidades

- Generacion dinamica de preguntas con datos de paises.
- 10 preguntas por ronda.
- 4 opciones por pregunta.
- Feedback visual inmediato para respuestas correctas e incorrectas.
- Navegacion entre preguntas.
- Temporizador de 15 segundos por pregunta.
- Pantalla final con resultado.
- High score persistido en `localStorage`.
- Modo claro/oscuro.
- Sonido corto al seleccionar una respuesta.

## API

La aplicacion consulta Rest Countries con el endpoint:

```text
https://restcountries.com/v3.1/all?fields=name,capital,flags
```

Aunque la consigna menciona `?limit=10`, ese endpoint actualmente responde `400` porque Rest Countries exige el parametro `fields`. El limite de 10 preguntas se aplica dentro de la logica del quiz.

## Comandos

Instalar dependencias:

```bash
pnpm install
```

Ejecutar en desarrollo:

```bash
pnpm dev
```

Abrir:

```text
http://localhost:4173/
```

Validar TypeScript:

```bash
pnpm typecheck
```

Ejecutar ESLint:

```bash
pnpm lint
```

Ejecutar pruebas:

```bash
pnpm exec vitest run
```

Generar build:

```bash
pnpm build
```

## Estructura

```text
src/
  components/
    Congratulations.tsx
    Question.tsx
  hooks/
    useCountryQuiz.ts
  routes/
    Home.tsx
    Quiz.tsx
  services/
    countries.ts
  types/
    quiz.ts
  utils/
    quizGenerator.ts
```

Los ejercicios independientes de LeetCode estan fuera de `src/`, en `1-5-LeetCodeProblems-Angel_Toro/`, para mantener separada la app React del bloque de algoritmos.

## Pruebas

El proyecto incluye pruebas para:

- Estados asincronos del quiz: carga, error y creacion de preguntas.
- Interaccion con opciones de respuesta.
- Boton `Jugar de nuevo` y persistencia del high score.

## Trabajo por persona

Persona 1 implemento la logica central: API, generacion de preguntas, estado del quiz, temporizador y pruebas asincronas.

Persona 2 implemento la interfaz: componentes visuales, Tailwind, feedback inmediato, modo claro/oscuro, sonido, high score y pruebas de interaccion.
