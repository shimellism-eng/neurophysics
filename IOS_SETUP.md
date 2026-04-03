# NeuroPhysics - iOS Native App Setup

## Prerequisites

- **macOS** with **Xcode 15+** installed (download from the Mac App Store)
- **CocoaPods** installed: `sudo gem install cocoapods`
- **Node.js 18+** and npm
- An **Apple Developer account** (free account works for local testing; paid $99/year account required for App Store submission)

## Setup Steps

Run these commands in order from the project root:

```bash
# 1. Install all dependencies (including Capacitor packages)
npm install

# 2. Build the web app
npm run build

# 3. Initialise Capacitor (creates capacitor config if not already present)
npm run cap:init

# 4. Add the iOS platform (generates the native Xcode project)
npm run cap:ios

# 5. Sync web assets into the native project
npm run cap:sync

# 6. Open the project in Xcode
npm run cap:open
```

## Code Signing in Xcode

Once the project is open in Xcode:

1. Select the **App** target in the project navigator.
2. Go to the **Signing & Capabilities** tab.
3. Check **Automatically manage signing**.
4. Select your **Team** from the dropdown (your Apple Developer account).
5. Xcode will generate provisioning profiles automatically.

For local testing on a physical device, a free Apple ID works. For TestFlight and App Store distribution you need a paid Apple Developer Program membership.

## Building After Code Changes

Whenever you update the web app code, rebuild and sync:

```bash
npm run build:ios
```

Then run the app again from Xcode (Cmd+R).

## App Store Submission Checklist

Before submitting to the App Store, prepare the following:

- [ ] **App icon**: 1024x1024 PNG (no transparency, no rounded corners -- Apple adds those)
- [ ] **Screenshots**: Required for each device size you support (6.7", 6.5", 5.5" iPhones at minimum)
- [ ] **App name**: NeuroPhysics (or your preferred display name, max 30 characters)
- [ ] **Subtitle**: e.g. "GCSE Physics Revision" (max 30 characters)
- [ ] **Description**: Full description of the app (up to 4000 characters)
- [ ] **Keywords**: Comma-separated, max 100 characters total (e.g. "GCSE, physics, revision, science, exam, equations")
- [ ] **Privacy policy URL**: Required -- host a privacy policy page on your website
- [ ] **Support URL**: A webpage where users can get help
- [ ] **Category**: Education
- [ ] **Age rating**: Complete the questionnaire in App Store Connect (likely 4+)
- [ ] **Build**: Upload via Xcode (Product > Archive > Distribute App)

## Troubleshooting

- **CocoaPods errors**: Run `cd ios/App && pod install --repo-update` then try again.
- **Signing errors**: Make sure your Apple ID is added in Xcode > Settings > Accounts.
- **Blank screen on device**: Ensure you ran `npm run build` before `npm run cap:sync`.
- **Changes not showing**: Run `npm run build:ios` to rebuild and re-sync.
