/*
* action types
*/

import { Template } from "./store";

const SET_TEMPLATES = 'SET_TEMPLATES'

/*
 * action creators
 */

interface SetTemplatesAction {
  type: typeof SET_TEMPLATES,
  templates: Template[],
}

function setTemplates(templates: Template[]): SetTemplatesAction {
  return { type: SET_TEMPLATES, templates }
}

export type AppActionTypes = SetTemplatesAction;
export { SET_TEMPLATES, setTemplates };
