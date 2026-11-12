export function tryAcquireSubmissionLock(lock) {
  if (lock.current) return false;
  lock.current = true;
  return true;
}
