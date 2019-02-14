import { intersection } from 'lodash';

/**
 * Convenience function to determine authentication status from a request.
 * @param {Object} req - The express request
 * @param {Object} res - The express response
 * @param {Function} next - The continuation callback
 * @returns {undefined} - Nothing
 */
export function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send(); // TODO RFC2616 requires us to send a WWW-Authenticate header
    }
    next();
}

export function hasAuthorization(...roles) {
    return (req, res, next) => {
        // We assume that the dev hasn't already checked for valid auth, and
        // since a 401 takes precedence over a 403, we check that here.
        if (!req.isAuthenticated()) {
            return res.status(401).send(); // TODO RFC2616 requires us to send a WWW-Authenticate header
        }

        if (intersection(req.user.roles, roles).length === 0) {
            return res.status(403).send();
        }

        next();
    };
}
