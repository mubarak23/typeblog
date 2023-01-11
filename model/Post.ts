import { Model } from 'objection';

export class Post extends Model {

    static get tableName() {
        return "posts";
    }
}