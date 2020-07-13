import React from 'react';
import { act, render, screen, cleanup, fireEvent } from '../utils/test-utils';
import { DeploymentForm } from './DeploymentForm';
import { AppState } from "../redux/reducers";

const mockedInitialState: Partial<AppState> = {
  templates: [
    {
      name: 't1',
      versions: ['t1v1', 't1v2', 't1v3', 'common'],
    },
    {
      name: 't2',
      versions: ['t2v1', 't2v2', 't2v3', 'common'],
    },
  ]
}

function selectInAutocomplete(inpTextbox: HTMLElement, value: string) {
  // click into the component
  inpTextbox.focus();
  // set value
  fireEvent.change(inpTextbox, { target: { value } });
  // arrow down to first option
  fireEvent.keyDown(inpTextbox, { key: 'ArrowDown' });
  // select element
  fireEvent.keyDown(inpTextbox, { key: 'Enter' });
}

afterEach(cleanup);

it('DeploymentForm can render', () => {
  act(() => {
    render(<DeploymentForm handleAddDeployment={() => null}/>, { initialState: mockedInitialState });
  });
  expect(screen.getByTestId('template')).toBeInTheDocument();
  expect(screen.getByTestId('version')).toBeInTheDocument();
  expect(screen.getByTestId('url')).toBeInTheDocument();
  expect(screen.getByTestId('btn-add-deployment')).toBeInTheDocument();
  expect(screen.getByTestId('btn-add-deployment')).toBeDisabled();
});

it('DeploymentForm can add new deployment', () => {
  const onHandleAddDeployment = jest.fn();
  act(() => {
    render(<DeploymentForm handleAddDeployment={onHandleAddDeployment}/>, { initialState: mockedInitialState });
  });
  const [inpAutocomplete, inpVersion, inpUrl, ...rest] = screen.getAllByRole('textbox');
  const btn = screen.getByTestId('btn-add-deployment');

  expect(rest.length).toEqual(0);
  expect(inpAutocomplete).toBeEnabled();
  expect(inpVersion).toBeDisabled();
  expect(inpUrl).toBeEnabled();

  selectInAutocomplete(inpAutocomplete, 't');

  expect(inpAutocomplete).toHaveValue('t1');
  expect(inpVersion).toBeEnabled();
  expect(btn).toBeDisabled();

  selectInAutocomplete(inpVersion, 't');

  expect(inpVersion).toHaveValue('t1v1');
  expect(btn).toBeDisabled();

  fireEvent.change(inpUrl, { target: { value: 'example_url' } });

  expect(inpUrl).toHaveValue('example_url');
  expect(btn).toBeEnabled();

  fireEvent.click(btn);

  expect(onHandleAddDeployment).toBeCalledTimes(1);
  expect(onHandleAddDeployment).toBeCalledWith({ templateName: 't1', version: 't1v1', url: 'example_url' });
});

it('DeploymentForm properly updates version when template is changed', () => {
  act(() => {
    render(<DeploymentForm handleAddDeployment={() => null}/>, { initialState: mockedInitialState });
  });
  const [inpAutocomplete, inpVersion, inpUrl, ...rest] = screen.getAllByRole('textbox');

  selectInAutocomplete(inpAutocomplete, 't1');

  expect(inpAutocomplete).toHaveValue('t1');

  selectInAutocomplete(inpVersion, 'common');

  expect(inpVersion).toHaveValue('common');

  selectInAutocomplete(inpAutocomplete, 't2');

  expect(inpVersion).toHaveValue('common');
});

it('DeploymentForm clears version when template is changed', () => {
  act(() => {
    render(<DeploymentForm handleAddDeployment={() => null}/>, { initialState: mockedInitialState });
  });
  const [inpAutocomplete, inpVersion, inpUrl, ...rest] = screen.getAllByRole('textbox');

  selectInAutocomplete(inpAutocomplete, 't1');

  expect(inpAutocomplete).toHaveValue('t1');

  selectInAutocomplete(inpVersion, 't1v1');

  expect(inpVersion).toHaveValue('t1v1');

  selectInAutocomplete(inpAutocomplete, 't2');

  expect(inpVersion).toHaveValue('');
});
