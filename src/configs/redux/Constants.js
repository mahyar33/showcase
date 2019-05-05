/* - DAEMON - on component mount and never canceled or started again.
   - RESTART_ON_REMOUNT — the saga will be started on component mount and
   cancelled with `task.cancel()` on component unmount for improved performance.
  - .ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again. */
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount'
export const DAEMON = '@@saga-injector/daemon'
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount'
