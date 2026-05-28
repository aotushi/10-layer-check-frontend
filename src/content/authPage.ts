export type AuthMode = 'login' | 'register'

export type AuthFormVisualState =
  | 'idle'
  | 'loading'
  | 'invalid-credentials'
  | 'validation-error'
  | 'server-error'

export type AuthFieldPayload = {
  email: string
  password: string
}

export type AuthAssuranceItem = {
  label: string
  detail: string
}

export type AuthPageCopy = {
  mode: AuthMode
  eyebrow: string
  title: string
  lead: string
  submitLabel: string
  switchPrompt: string
  switchLabel: string
  switchHref: string
  passwordHelp?: string
  assuranceTitle: string
  assuranceLead: string
  assuranceItems: AuthAssuranceItem[]
}

export const authPageCopies = {
  login: {
    mode: 'login',
    eyebrow: 'Account access',
    title: 'Sign in to saved scan history',
    lead: 'Use your account to reopen previous diagnostic reports and continue technical review.',
    submitLabel: 'Login',
    switchPrompt: 'New to 10-Layer Check?',
    switchLabel: 'Create an account',
    switchHref: '/register',
    passwordHelp: undefined,
    assuranceTitle: 'What signing in unlocks',
    assuranceLead:
      'Authentication keeps saved reports reachable without changing the public scan boundary.',
    assuranceItems: [
      {
        label: 'Saved scan history',
        detail: 'Return to previous public-domain diagnostic runs.',
      },
      {
        label: 'Structured reports',
        detail: 'Reopen normalized findings, evidence rows, and missing-data notes.',
      },
      {
        label: 'Evidence-based findings',
        detail: 'Keep risk language tied to collected public evidence.',
      },
      {
        label: 'Revisit reports',
        detail: 'Compare repeated reviews without recreating context manually.',
      },
    ],
  },
  register: {
    mode: 'register',
    eyebrow: 'Account creation',
    title: 'Create an account for report history',
    lead: 'Save public diagnostic runs so the evidence trail remains available after a scan.',
    submitLabel: 'Create account',
    switchPrompt: 'Already have an account?',
    switchLabel: 'Login',
    switchHref: '/login',
    passwordHelp: 'Use at least 8 characters.',
    assuranceTitle: 'Why an account exists',
    assuranceLead:
      'The account surface is limited to persistence and repeated review, not a sales workflow.',
    assuranceItems: [
      {
        label: 'Save scan history',
        detail: 'Persist submitted domains and completed report references.',
      },
      {
        label: 'Revisit reports',
        detail: 'Open completed or partial reports from the workspace table.',
      },
      {
        label: 'Track repeated scans',
        detail: 'Keep repeated public checks visible as separate records.',
      },
      {
        label: 'Preserve evidence',
        detail: 'Keep normalized evidence rows and report boundaries attached to the scan.',
      },
    ],
  },
} satisfies Record<AuthMode, AuthPageCopy>
