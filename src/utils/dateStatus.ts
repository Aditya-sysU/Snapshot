export type EventStatus = 'upcoming' | 'live' | 'completed';

export interface EventStatusInfo {
  status: EventStatus;
  label: string;
  isLive: boolean;
  isUpcoming: boolean;
  isCompleted: boolean;
}

/**
 * Computes whether an event date (formatted as YYYY-MM-DD) is upcoming,
 * live right now on the day of the event, or already completed.
 */
export function getEventDateStatus(targetDateStr: string): EventStatusInfo {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  if (todayStr === targetDateStr) {
    return {
      status: 'live',
      label: 'LIVE',
      isLive: true,
      isUpcoming: false,
      isCompleted: false,
    };
  }

  if (todayStr < targetDateStr) {
    return {
      status: 'upcoming',
      label: 'Upcoming',
      isLive: false,
      isUpcoming: true,
      isCompleted: false,
    };
  }

  return {
    status: 'completed',
    label: 'Completed',
    isLive: false,
    isUpcoming: false,
    isCompleted: true,
  };
}
