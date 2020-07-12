import React from 'react';
import { act, render, screen, cleanup, fireEvent } from '../utils/test-utils';
import { AlertDialog } from './AlertDialog';

afterEach(cleanup);

const props = {
  title: '--title--',
  text: '--text--',
  open: true,
  handleClose: () => null,
};

it('checks if AlertDialog is open with specified title & text', () => {
  act(() => {
    render(<AlertDialog {...props} />);
  });

  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.text)).toBeInTheDocument();
});

it('checks if AlertDialog is closed', () => {
  act(() => {
    render(<AlertDialog {...props} open={false} />);
  });

  expect(screen.queryByText(props.text)).toBeNull();
});

it('checks if AlertDialog calls handleClose after clicking "Close"', () => {
  const onHandleClose = jest.fn();
  act(() => {
    render(<AlertDialog {...props} handleClose={onHandleClose} />);
  });

  const btn = screen.getByTestId('btn_close');
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);

  expect(onHandleClose).toBeCalledTimes(1);
});
