# RNTemplate

A production-oriented React Native starter template (RN 0.86 / React 19 / TypeScript / Redux Toolkit) with navigation, a typed API layer, forms, secure storage, social login, and notifications pre-wired.

> This is a **template**. Some flows (login, sign-up, profile save, forgot-password) intentionally ship as mocked placeholders you replace per project — see the [Integration checklist](#integration-checklist).

## Prerequisites

- Node `>= 22.11.0` (an `engines` constraint is declared in `package.json`)
- Ruby + CocoaPods (iOS)
- JDK 17 + Android SDK (Android)
- Xcode (iOS), Android Studio (Android)

## Setup

```bash
# 1. Install JS dependencies
npm install

# 2. Create your env file and fill in the values (see table below)
cp .env.example .env

# 3. Add your own Firebase config (NOT committed — see below)
cp android/app/google-services.example.json android/app/google-services.json
cp ios/GoogleService-Info.example.plist ios/GoogleService-Info.plist

# 4. Install iOS pods
cd ios && bundle install && bundle exec pod install && cd ..
```

### Environment variables (`.env`)

| Key                         | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `ENV`                       | `development` / `production`                             |
| `APP_NAME`                  | Display name used for the native app                     |
| `API_URL`                   | Base URL for the API layer (Axios)                       |
| `API_TIMEOUT`               | Request timeout in ms                                    |
| `GOOGLE_WEB_CLIENT_ID`      | Google Sign-In web client id                             |
| `GOOGLE_IOS_CLIENT_ID`      | Google Sign-In iOS client id                             |
| `GOOGLE_REVERSED_CLIENT_ID` | Reversed iOS client id (required for the iOS URL scheme) |

`.env` is gitignored; keep `.env.example` in sync when adding keys.

### Firebase config

`android/app/google-services.json` and `ios/GoogleService-Info.plist` are **gitignored** — they hold per-project secrets. Copy the committed `*.example` files and replace them with the config from **your own** Firebase project. Never commit real credentials.

> **Also rename the app identity to match your Firebase project.** This template ships with `applicationId` / bundle id `com.ds.crm`. Update `applicationId` in `android/app/build.gradle` and `PRODUCT_BUNDLE_IDENTIFIER` in Xcode (iOS target) so they match the package name / bundle id you registered in your Firebase project — otherwise Firebase Auth and Google Sign-In will silently mismatch.

## Running

```bash
npm start          # Metro
npm run android    # build + run Android
npm run ios        # build + run iOS
```

## Scripts

| Command                             | Purpose                  |
| ----------------------------------- | ------------------------ |
| `npm run lint` / `npm run lint:fix` | ESLint                   |
| `npm run format`                    | Prettier across the repo |
| `npm run typecheck`                 | `tsc --noEmit`           |
| `npm test`                          | Jest                     |

A Husky pre-commit hook runs `lint-staged` automatically.

## Conventions

- **Path aliases**: import via `@components`, `@api`, `@navigation`, `@store`, `@theme`, `@lib`, `@hooks`, `@utils`, `@constants`, `@app-types` (defined in `tsconfig.json` + `babel.config.js`). No deep relative `../../..` imports.
- **Folders lowercase, files PascalCase.**
- **Secure storage**: the session token is stored in the Keychain (`src/lib/keychain.ts`), not AsyncStorage. Restore happens on app boot via `AuthService.restoreSession()`.

## Integration checklist

Replace these mocked placeholders with real backend calls before shipping:

| Location                                         | Currently               | Replace with                                                    |
| ------------------------------------------------ | ----------------------- | --------------------------------------------------------------- |
| `src/screens/auth/LoginScreen.tsx`               | stores `demo-token`     | `AuthService.loginUser(values)` (already implemented)           |
| `src/screens/auth/SignUpScreen.tsx`              | stores `demo-token`     | a new `AuthService.registerUser()` against `Endpoints.register` |
| `src/screens/home/Profile/EditProfileScreen.tsx` | `onSubmit` → `goBack()` | a `ProfileService.update()` call                                |
| `src/screens/auth/ForgotPasswordScreen.tsx`      | `onSubmit` → `goBack()` | an `AuthService.forgotPassword()` call                          |

## Before release

- **Android release signing** uses the debug keystore by default (stock RN CLI) — generate a real keystore before a production build (`android/app/build.gradle`).
- **Cleartext HTTP** is enabled for local dev (`android:usesCleartextTraffic="true"`) — scope or disable it for release.
- **iOS privacy**: populate `NSPrivacyCollectedDataTypes` in `PrivacyInfo.xcprivacy` once real data collection is wired.
- **Token refresh** is out of scope; only 401 → logout is handled (`src/api/interceptors/responseInterceptor.ts`).
