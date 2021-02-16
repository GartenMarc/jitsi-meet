/**
 * The type of the action which sets the list of known participant IDs which
 * have an active screen share.
 *
 * @returns {{
 *     type: SCREEN_SHARE_PARTICIPANTS_UPDATED,
 *     participantIds: Array<string>
 * }}
 */
export const SCREEN_SHARE_PARTICIPANTS_UPDATED
    = 'SCREEN_SHARE_PARTICIPANTS_UPDATED';

/**
 * The type of the action which enables or disables the feature for showing
 * video thumbnails in a two-axis tile view.
 *
 * @returns {{
 *     type: SET_TILE_VIEW,
 *     enabled: boolean
 * }}
 */
export const SET_TILE_VIEW = 'SET_TILE_VIEW';



/**
 * The type of the action which enables or disables the feature for showing
 * video thumbnails in a two-axis trainer view.
 *
 * @returns {{
 *     type: SET_TRAINER_VIEW,
 *     enabled: boolean
 * }}
 */
export const SET_TRAINER_VIEW = 'SET_TRAINER_VIEW';


/**
 * The static variable which indicates active view is shown or not
 *
 * @returns {{
 *     type: ACTIVATE_TRAINER_VIEW,
 *     enabled: boolean
 * }}
 */
export const ACTIVATE_TRAINER_VIEW = 'ACTIVATE_TRAINER_VIEW'
