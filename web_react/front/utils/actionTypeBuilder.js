/**
 * Created by kevin on 16/5/25.
 */
export function actionTypeBuilder(prefix) {
  return {
    type: actionType => `${prefix}/${actionType}`,
    ready: actionType => `${actionType}/ready`,
    changed: actionType => `${actionType}/changed`,
    error: actionType => `${actionType}/error`,
  };
}

export default actionTypeBuilder('@odoo');