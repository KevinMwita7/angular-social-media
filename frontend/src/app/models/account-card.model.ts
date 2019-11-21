/**
 *Used to render accounts returned from a search query. Needs the currently logged in user's details
 *and a list of the people that the users returned from the search result follow. This is to determine if
 *the current user already follows any of the users returned
 */
import { UserAccount } from '../models/user-account.model';
// Used to hold info on user accounts returned from search reasults
export class AccountCardModel {
    _id: string;
    owner: string;
    profilePic: string;
    owner_id: string;
    following: boolean;

    constructor(account: UserAccount, peopleFollowed: Array<string>) {
        this._id = account._id;
        // the model returned from the backend has a field of owner instead of ownerUserName used in the frontend
        // hence the need to use bracket notaion
        this.owner = account['owner'];
        this.profilePic = account.profilePic;
        this.owner_id = account.owner_id;
        peopleFollowed.includes(account.owner_id) ? this.following = true : this.following = false;
    }
    alreadyFollowing() {
        return this.following;
    }
    updateSubscription() {
        this.following = !this.following;
    }
}
