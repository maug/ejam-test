import React from 'react';
import { act, render, screen, cleanup } from '../utils/test-utils';
import { CountdownTimer } from './CountdownTimer';

let fakeDate = { now: 1 };

beforeEach(() => {
  jest.useFakeTimers();
  Date.now = jest.spyOn(Date, 'now').mockImplementation(() => fakeDate.now) as any;
});

afterEach(() => {
  jest.useRealTimers();
  (Date.now as any).mockRestore();
  return cleanup();
});

it('checks if CountdownTimer counts down and calls handleEnd', () => {
  const onHandleEnd = jest.fn();
  act(() => {
    render(<CountdownTimer countdownFrom={1000} step={1} handleEnd={onHandleEnd} />);
  });
  // advance timers for component to render timer with initial value
  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(screen.getByText(/^00:01:000/)).toBeInTheDocument();

  // advance 100ms
  fakeDate.now += 100;
  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(screen.getByText(/^00:00:900/)).toBeInTheDocument();

  // advance 900ms
  fakeDate.now += 900;
  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(screen.getByText(/^00:00:000/)).toBeInTheDocument();
  // countdown timer should call handleEnd
  expect(onHandleEnd).toBeCalledTimes(1);
});

it('checks if CountdownTimer stops at zero', () => {
  act(() => {
    render(<CountdownTimer countdownFrom={1000} step={1} handleEnd={() => null} />);
  });
  // advance timers for component to render timer with initial value
  act(() => {
    jest.advanceTimersByTime(1);
  });
  fakeDate.now += 2000;
  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(screen.getByText(/^00:00:000/)).toBeInTheDocument();
});
