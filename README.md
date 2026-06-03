# LessonLens

LessonLens is a hackathon demo that turns a short classroom transcript into a supportive teacher coaching card.

## Problem Statement

Many government school teachers receive limited classroom feedback. When feedback is available, it can feel formal, delayed, or judgmental. Teachers need quick, practical suggestions they can use in the next class.

## Solution Summary

LessonLens lets a teacher paste a classroom transcript and receive simple, non-judgmental feedback in seconds. The coaching card highlights student participation, question quality, language clarity and pacing, one next-class action, one teacher strength, encouragement, and a caution when the transcript has limited evidence.

If an OpenAI API key is available, LessonLens uses the real LLM route. If no key is configured, the demo falls back to safe mock feedback.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- OpenAI API
- CSS-in-JS styling inside the main page

## How To Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variable Setup

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=your_api_key_here
```

You can also copy `.env.example` as a starting point. If `OPENAI_API_KEY` is not set, the app still runs with mock feedback.

## Demo Flow

1. Open the app.
2. Choose a sample transcript from the dropdown.
3. Click `Load Sample Transcript` if needed.
4. Click `Analyze My Class`.
5. Wait for the loading state.
6. Show the returned coaching card.
7. Use `Clear` or `Start Over` to reset the demo.

Recommended first sample: `Interactive class`, because it shows stronger participation and reasoning-based feedback. Use `Lecture-heavy class` next to show how LessonLens responds to teacher-dominated lessons.

## What Is Implemented

- Stitch-inspired landing and analysis UI
- Transcript textarea
- Three demo sample transcripts
- Client-side validation for empty, short, and very long transcripts
- `POST /api/analyze`
- OpenAI-powered coaching feedback
- Mock fallback when `OPENAI_API_KEY` is missing
- Normalization layer to keep feedback fields safe for the UI
- Friendly UI error messages
- Clear/reset behavior

## Future Scope

- Audio upload
- Transcription
- Multilingual support
- Teacher profiles
- Session history
- PDF export
