/**
 * @param {Database} db - Pg-promise database object
 * @param  {String} title - Title of the new event
 * @param  {String} date - Date and time of the new event
 * @param  {String} imageURL - URL for cover image of the event
 * @param  {String} location - Location of the event
 * @returns {Promise} - Promise that resolves to new row in db.
 */
async function insert(db, title, date, imageURL, location) {
    // Notice that our JavaScript variables are CamelCase
    // and our SQL variables are snake_case. This is a
    // common convention.
    const stmt = `
        INSERT INTO events (title, date, image_url, location)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, date, image_url, location, created_at
    `;
    return db.one(stmt, [title, date, imageURL, location]);
}


async function insertAttendee(db, mail, eventId) {
    const stmt = `
        INSERT INTO attendees (email, event_id)
        VALUES ($1, $2)
        RETURNING email, event_id
    `;
    return db.one(stmt, [mail, eventId]);
}

async function getAttendeeByEventId(db, eventId) {
    // See pgpromise documentation for this ":value" syntax
    // and why it is used.
    const stmt = `
        SELECT * FROM attendees WHERE
        event_id ='$1:value'
    `;
    return db.manyOrNone(stmt, [eventId]);
}


/**
 * @param {Database} db - Pg-promise database object
 * @returns {Promise} - Promise that resolves to and int
 */
async function count(db) {
    const stmt = 'select COUNT(*) FROM events';
    const result = await db.one(stmt);
    return parseInt(result.count, 10);
}

/**
 * @param  {Database} db - Pg-promise database object
 * @param  {String} searchString - String for which to search event locations
 * @returns {Promise} - Promise that resolves to one event or null
 */
async function getByLocation(db, searchString) {
    // See pgpromise documentation for this ":value" syntax
    // and why it is used.
    const stmt = `
        SELECT * FROM events WHERE
        location ILIKE '%$1:value%'
    `;
    return db.manyOrNone(stmt, [searchString]);
}

async function getByTitle(db, searchString) {
    // See pgpromise documentation for this ":value" syntax
    // and why it is used.
    const stmt = `
        SELECT * FROM events WHERE
        title ILIKE '%$1:value%'
    `;
    return db.manyOrNone(stmt, [searchString]);
}


async function getAll(db, searchString) {
    // See pgpromise documentation for this ":value" syntax
    // and why it is used.
    const stmt = `
        SELECT * FROM events
    `;
    return db.manyOrNone(stmt, [searchString]);
}

async function getById(db, id) {
    // See pgpromise documentation for this ":value" syntax
    // and why it is used.
    const stmt = `
        SELECT * FROM events WHERE
        id = '$1:value'
    `;
    return db.oneOrNone(stmt, [id]);
}


module.exports = {
    insert,
    count,
    getByLocation,
    getById,
    insertAttendee,
    getAttendeeByEventId,
    getAll,
    getByTitle,
};
