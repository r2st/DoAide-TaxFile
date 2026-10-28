/**
 * DoAide Umami Event Tracking Utility
 * Wraps umami.track() with safety checks and consistent naming.
 *
 * Event naming convention:  <category>:<action>
 *   calculator:calculate, calculator:share, calculator:print
 *   feedback:submit, feedback:open
 *   advisor:ask, advisor:open
 *   nav:tool-click, nav:guide-click, nav:blog-click
 *   error:boundary, error:api
 *   cta:install-pwa, cta:referral-click
 */

function track(eventName, data = {}) {
  try {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(eventName, {
        ...data,
        path: window.location.pathname,
      })
    }
  } catch {
    // silently ignore — analytics should never break the app
  }
}

/** Calculator result computed */
export function trackCalculation(calculatorName, meta = {}) {
  track('calculator:calculate', { calculator: calculatorName, ...meta })
}

/** User shared results */
export function trackShare(medium, calculatorName) {
  track('calculator:share', { medium, calculator: calculatorName })
}

/** User printed results */
export function trackPrint(calculatorName) {
  track('calculator:print', { calculator: calculatorName })
}

/** Feedback widget interactions */
export function trackFeedback(action, meta = {}) {
  track(`feedback:${action}`, meta)
}

/** AI Advisor interactions */
export function trackAdvisor(action, meta = {}) {
  track(`advisor:${action}`, meta)
}

/** Navigation / tool discovery */
export function trackNav(type, target) {
  track(`nav:${type}`, { target })
}

/** Error shown to user */
export function trackError(source, message) {
  track('error:shown', { source, message: String(message).slice(0, 200) })
}

/** CTA interactions (PWA install, referral, etc.) */
export function trackCTA(action, meta = {}) {
  track(`cta:${action}`, meta)
}

/** Generic event for one-offs */
export function trackEvent(name, data = {}) {
  track(name, data)
}

export default {
  trackCalculation,
  trackShare,
  trackPrint,
  trackFeedback,
  trackAdvisor,
  trackNav,
  trackError,
  trackCTA,
  trackEvent,
}
