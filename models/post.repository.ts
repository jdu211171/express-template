import db from '../connection/Database';
import admin from 'firebase-admin';
const selectedClient = {
  "mobilesdk_app_id": "1:826185290693:android:8a9342aca2a61c744ff1ac",
  "android_client_info": {
    "package_name": "com.newapp"
  },
  "api_key": [
    {
      "current_key": "AIzaSyAEP0nT_lFFlPhmtjveTV2es8bTrapxHyQ"
    }
  ]
};
const serviceAccount = {
  project_id: "react-native-notify-e8258",
  private_key: "-----BEGIN PRIVATE KEY-----MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCYyVh/ISy0ISpxFlq9TTx1M7YSq1bzNHIbm+qBPa8YweTlLEWBIXaq1nYKBEgtkJJvu/CYiBeiC0HRgB92itKeqL/HdssPgtFrVt7m83xg+SbheH2mdRfuA7P3lw9U7o+aRNt0SzF2mo6u3/kf3/kakEToEdHYQM3/5vQrj0rW/d29/nXi1MmgCclc5Fl11WWC/CmhGActWt0hEDnHAmO8jOj7uyQ2crxvgLBkdl9+npt3adR4YTSxGb1E1Dn12BtLuDdAAvUc+bCbvNAWZ7brsI0l/y2fM6j3agUcJ/V2Unn68BRZ3n2aPsXOOCtt4hi2Zyzmlo1ej+T/vngnbXPBAgMBAAECgf9iI3KktjpwuZz5ZtKCJcpfvgeFlmkTbuycr1nCCk0eKe1NB1LdzxDaS0cmx/lUyzhEbQPt9fy4KWLtns6W5jTDlMEa7kMgg3bg67vhvSR3ZZKD4VFUSoJEcDx5HJ7Mfy/ed7w+xs3O0Rg1W8g5oTPwzBp2tnuD3Jx1c3QDRtdboFcdfVJgmHi1/TN1GyqpNEcPUc/cenGhtzDFDoggMRFW6HeGfeex8qmKCQ089yHtdOTCL7PVadCvL2GC9zwfjY1hKsbx8K4j50q+HwuB0cvtG0rWZ8mi/Sp+/j7jFmLQfv/fsR0GQI6ZuTxwwyGR3xiHqbZw/u34/Svnh/Rv7NECgYEAz8Kfv2uy50zAKDOm0pN28XPTyn2QhM9XiWpnvSGjhj7wfhpqpAzUAx9wxWo/hHwUhDds67K2OkE0FsdJOxswVx7EP3CVZg75PkRa6hz6dsHPXBLDfga5DKO8ukJhU0erzb6fQJqPF4JpmoQ9ggxNPFp/g2Pq5bsJVd/FqDee0rECgYEAvEMN2ykgwdYGVjmYaGb/Sn1Yo1uDJGW+Uz/0Zi1XjuuAgGPcI6E83bk6r68rFrmegrmWag36JQAY7Ih8HSu+8VTMBmzpnhvJFyMScRwuBLgXJUqU6TrVaH0S/DkZZrBwqxNxcW2XeDnXLMj1yErn/X9oA6TKaIoP6z2gGQ86VhECgYEAjC7KEyLcJ+1FitqvKU6O5wQ8V1i59qLgcbv2G0tjRuWY571zTxXIyAKi2NGD4iTGwx+SwsZm5o+wUd5Nry/9QgtkZ1nTtHVN/5GntmevKApFm96dQZ/PpJOmeBbqDINDjSOd2L1w52/7SWMJDYK3ao21lDYK/M9i0SqX95Tv+UECgYA4LrKl4uI5totxlAKdtY8eRcX8CkVayVpBMebXz1Q//Jv+tM5ve6DUcoDHCTmMsJxTWts+jylFfX/yptCTTAjRsIKqsDoPyy75zqekRcqd8epGYLmL2NjzM9BEoS2pbaJSC51hQllfsbM7VEW1HlWZWzpJTBZzmDAj/eIXWGoKYQKBgHXkAFivCqvTgBG8IIT+tdtohn8wwbW/Lz/S6hh1fHK7HyW3tpcPZrd+0qpT7PEq54IuC7kgmN9ScAXU1EcDmtNengCy7GEKzmxHZ/U1OLbOKZVegeS2aeu8O0Dshtfq5xA053rj+28kiXgfDrLlbhBolL7jjgADexICFE0r0SMo-----END PRIVATE KEY-----",
  client_email: "firebase-adminsdk-zlwpu@react-native-notify-e8258.iam.gserviceaccount.com",
};

class PostRepository {

    async allPosts(lastId: number, limit: number, user_id: number): Promise<any> {
        try {
            return db.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                u.id AS user_id,u.username,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count,
                CASE WHEN EXISTS (
                    SELECT 1
                    FROM Reaction AS r
                    WHERE r.post_id = p.id
                    AND r.user_id = :user_id
                    AND r.reaction_type = 1
                ) THEN 1 ELSE 0 END AS liked_status
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC
            LIMIT 
                :limit OFFSET :offset;`, {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString(),
                    user_id: user_id
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    /*
        * id: number
        * content: string
        * user_name: string
        * user_id: number
        * created_at: Date
        * updated_at: Date
        * reactions: {
        *  reaction_type: number
        * }
        * */

    async search(lastId: number, limit: number, keyword: string, user_id: number): Promise<any> {
        try {
            return db.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                u.id AS user_id,u.username,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count,
                CASE WHEN EXISTS (
                    SELECT 1
                    FROM Reaction AS r
                    WHERE r.post_id = p.id
                    AND r.user_id = :user_id
                    AND r.reaction_type = 1
                ) THEN 1 ELSE 0 END AS liked_status
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            WHERE 
                p.content LIKE :keyword
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC
            LIMIT 
                :limit OFFSET :offset;`, {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString(),
                    keyword: `%${keyword}%`,
                    user_id: user_id
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async list(id: number[], user_id: number): Promise<any> {
        try {
            return db.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                u.id AS user_id,u.username,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count,
                CASE WHEN EXISTS (
                    SELECT 1
                    FROM Reaction AS r
                    WHERE r.post_id = p.id
                    AND r.user_id = :user_id
                    AND r.reaction_type = 1
                ) THEN 1 ELSE 0 END AS liked_status
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            WHERE p.id in (${id.join(',')})
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC;`, {
                    user_id: user_id,
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async searchList(id: number[], keyword: string, user_id: number): Promise<any> {
        try {
            return db.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                u.id AS user_id,u.username,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count,
                CASE WHEN EXISTS (
                    SELECT 1
                    FROM Reaction AS r
                    WHERE r.post_id = p.id
                    AND r.user_id = :user_id
                    AND r.reaction_type = 1
                ) THEN 1 ELSE 0 END AS liked_status
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            WHERE 
                p.id in (${id.join(',')}) AND p.content LIKE :keyword 
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC;`, {
                    user_id: user_id,
                    keyword: `%${keyword}%`,
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findPost(id: number): Promise<any> {
        try {
            return db.query(`SELECT 
                        p.id,p.content,p.user_id,
                        DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                        IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                        u.username
                    FROM 
                        Post as p
                    JOIN 
                        User as u
                    ON 
                        p.user_id = u.id 
                    WHERE 
                        p.id = :id`, {
                id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async userPost(lastId: number, limit: number, user_id: number): Promise<any> {
        try {
            return db.query(`SELECT
                p.id,p.content,DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
                IFNULL(DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s'), NULL) AS updated_at,
                count(DISTINCT c.id) AS comment_count, count(DISTINCT r.id) AS reaction_count,
                CASE WHEN EXISTS (
                    SELECT 1
                    FROM Reaction AS r
                    WHERE r.post_id = p.id
                    AND r.user_id = :user_id
                    AND r.reaction_type = 1
                ) THEN 1 ELSE 0 END AS liked_status
            FROM 
                Post as p
            INNER JOIN 
                User AS u ON u.id = p.user_id
            LEFT JOIN 
                Comment as c ON c.post_id = p.id
            LEFT JOIN 
                Reaction as r ON r.post_id = p.id AND r.reaction_type = 1
            WHERE p.user_id = :user_id
            GROUP 
                BY p.id
            ORDER 
                BY p.id DESC,p.created_at DESC
            LIMIT 
                :limit OFFSET :offset;`, {
                    limit: limit.toString(),
                    offset: ((lastId - 1) * limit).toString(),
                    user_id: user_id
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createPost(userId: number, content: string): Promise<any> {
        try {
            return db.query('INSERT INTO Post (content, user_id, created_at) VALUE (:content, :userId, NOW())', {
                content: content,
                userId: userId
            });
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    async updatePost(id: number, content: string): Promise<any> {
        try {
            return db.query('UPDATE Post SET content = :content, updated_at = NOW() WHERE id = :id', {
                id: id,
                content: content
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deletePost(id: number): Promise<any> {
        try {
            return db.query('DELETE FROM Post WHERE id = :id', {
                id: id
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getReactions(postId: number) {
        try {
            return db.query('SELECT reaction_type FROM Reaction WHERE post_id = :post_id', {
                post_id: postId
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async addReaction(userId: number, postId: number, reactionType: number) {
        try {
            return db.query('INSERT INTO Reaction (reaction_type, user_id, post_id) VALUE (:reaction_type, :user_id, :post_id)', {
                reaction_type: reactionType,
                user_id: userId,
                post_id: postId
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new PostRepository();
