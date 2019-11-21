export class UserAccount {
    public _id?: string;
    public profilePic?: string;
    public owner_id ?: string;
    public preferences ?: object;
    public bio?: string;
    public ownerUserName?: string;
    public createdAt?: Date;

    constructor(obj?: any) {
        this._id = obj && obj._id;
        this.profilePic = obj && obj.profilePic;
        this.owner_id = obj && obj.owner_id;
        this.preferences = obj && obj.preferences;
        this.bio = obj && obj.bio;
        this.ownerUserName = obj && obj.owner;
        this.createdAt = obj && obj.createdAt;
    }
}
