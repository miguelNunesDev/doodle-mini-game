/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
 */

const emojis = {
	'-': ' ',
	O: '🚪',
	X: '💣',
	I: '🎁',
	PLAYER: '😃',
	BOMB_COLLISION: '💥',
	GAME_OVER: '💀',
	WIN: '😁',
    LIVE: '💖',
    BROKEN: '💔'
};

const maps = [];
maps.push(`
I--XX
X-XXX
X--XX
XX-OX
XXXXX
`);
maps.push(`
    O-XXXXXXX
    X-XXXXXXXX
    X-XXXXXXXX
    X-XXXXXXXX
    X-XXXXXXXX
    X-XXXXXXXX
    X-XXXXXXXX
    X-XXXXXXXX
    --XXXXXXXX
    IXXXXXXXXX
  `);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);

export { maps, emojis };
