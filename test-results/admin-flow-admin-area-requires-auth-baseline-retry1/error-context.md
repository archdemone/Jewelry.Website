# Page snapshot

```yaml
- main [ref=e3]:
  - main [ref=e4]:
    - generic [ref=e7]:
      - heading "Welcome Back" [level=1] [ref=e8]
      - paragraph [ref=e9]: Sign in to your account to continue
    - generic [ref=e12]:
      - link "Back to Home" [ref=e14] [cursor=pointer]:
        - /url: /
        - img [ref=e15] [cursor=pointer]
        - text: Back to Home
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: Email Address
          - generic [ref=e21]:
            - img [ref=e22]
            - textbox "Email Address" [ref=e25]
        - generic [ref=e26]:
          - generic [ref=e27]: Password
          - generic [ref=e28]:
            - img [ref=e29]
            - textbox "Password" [ref=e32]
            - button [ref=e33] [cursor=pointer]:
              - img [ref=e34] [cursor=pointer]
        - button "Sign in" [ref=e37] [cursor=pointer]
        - generic [ref=e42]: Or continue with
        - button "Continue with Google" [ref=e43] [cursor=pointer]:
          - img [ref=e44] [cursor=pointer]
          - text: Continue with Google
      - generic [ref=e49]:
        - paragraph [ref=e50]:
          - text: Don't have an account?
          - link "Create one" [ref=e51] [cursor=pointer]:
            - /url: /auth/register
        - paragraph [ref=e52]:
          - link "Forgot your password?" [ref=e53] [cursor=pointer]:
            - /url: /auth/forgot-password
```