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
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCYyVh/ISy0ISpx\nFlq9TTx1M7YSq1bzNHIbm+qBPa8YweTlLEWBIXaq1nYKBEgtkJJvu/CYiBeiC0HR\ngB92itKeqL/HdssPgtFrVt7m83xg+SbheH2mdRfuA7P3lw9U7o+aRNt0SzF2mo6u\n3/kf3/kakEToEdHYQM3/5vQrj0rW/d29/nXi1MmgCclc5Fl11WWC/CmhGActWt0h\nEDnHAmO8jOj7uyQ2crxvgLBkdl9+npt3adR4YTSxGb1E1Dn12BtLuDdAAvUc+bCb\nvNAWZ7brsI0l/y2fM6j3agUcJ/V2Unn68BRZ3n2aPsXOOCtt4hi2Zyzmlo1ej+T/\nvngnbXPBAgMBAAECgf9iI3KktjpwuZz5ZtKCJcpfvgeFlmkTbuycr1nCCk0eKe1N\nB1LdzxDaS0cmx/lUyzhEbQPt9fy4KWLtns6W5jTDlMEa7kMgg3bg67vhvSR3ZZKD\n4VFUSoJEcDx5HJ7Mfy/ed7w+xs3O0Rg1W8g5oTPwzBp2tnuD3Jx1c3QDRtdboFcd\nfVJgmHi1/TN1GyqpNEcPUc/cenGhtzDFDoggMRFW6HeGfeex8qmKCQ089yHtdOTC\nL7PVadCvL2GC9zwfjY1hKsbx8K4j50q+HwuB0cvtG0rWZ8mi/Sp+/j7jFmLQfv/f\nsR0GQI6ZuTxwwyGR3xiHqbZw/u34/Svnh/Rv7NECgYEAz8Kfv2uy50zAKDOm0pN2\n8XPTyn2QhM9XiWpnvSGjhj7wfhpqpAzUAx9wxWo/hHwUhDds67K2OkE0FsdJOxsw\nVx7EP3CVZg75PkRa6hz6dsHPXBLDfga5DKO8ukJhU0erzb6fQJqPF4JpmoQ9ggxN\nPFp/g2Pq5bsJVd/FqDee0rECgYEAvEMN2ykgwdYGVjmYaGb/Sn1Yo1uDJGW+Uz/0\nZi1XjuuAgGPcI6E83bk6r68rFrmegrmWag36JQAY7Ih8HSu+8VTMBmzpnhvJFyMS\ncRwuBLgXJUqU6TrVaH0S/DkZZrBwqxNxcW2XeDnXLMj1yErn/X9oA6TKaIoP6z2g\nGQ86VhECgYEAjC7KEyLcJ+1FitqvKU6O5wQ8V1i59qLgcbv2G0tjRuWY571zTxXI\nyAKi2NGD4iTGwx+SwsZm5o+wUd5Nry/9QgtkZ1nTtHVN/5GntmevKApFm96dQZ/P\npJOmeBbqDINDjSOd2L1w52/7SWMJDYK3ao21lDYK/M9i0SqX95Tv+UECgYA4LrKl\n4uI5totxlAKdtY8eRcX8CkVayVpBMebXz1Q//Jv+tM5ve6DUcoDHCTmMsJxTWts+\njylFfX/yptCTTAjRsIKqsDoPyy75zqekRcqd8epGYLmL2NjzM9BEoS2pbaJSC51h\nQllfsbM7VEW1HlWZWzpJTBZzmDAj/eIXWGoKYQKBgHXkAFivCqvTgBG8IIT+tdto\nhn8wwbW/Lz/S6hh1fHK7HyW3tpcPZrd+0qpT7PEq54IuC7kgmN9ScAXU1EcDmtNe\nngCy7GEKzmxHZ/U1OLbOKZVegeS2aeu8O0Dshtfq5xA053rj+28kiXgfDrLlbhBo\nlL7jjgADexICFE0r0SMo\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-zlwpu@react-native-notify-e8258.iam.gserviceaccount.com",
};
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
    databaseURL: 'https://react-native-notify-e8258.firebaseio.com',
});
class PostRepository {
    userPost(currentLoad: number, limit: number, id: any) {
        throw new Error('Method not implemented.');
    }
<<<<<<< HEAD
    async allPosts(lastId: number, limit: number): Promise<any> {
=======

    async allPosts(lastId: number, limit: number, user_id: number): Promise<any> {
>>>>>>> c916f94fdf3aa670f29d3ca0e2208ace84db1a83
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
<<<<<<< HEAD
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
=======
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

>>>>>>> c916f94fdf3aa670f29d3ca0e2208ace84db1a83
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
<<<<<<< HEAD
    async createPost(userId: number, content: string): Promise<any> {
        try {
          // Insert the new post into the Post table
          const result = await db.query('INSERT INTO Post (content, user_id, created_at) VALUES (:content, :userId, :createdAt)', {
            content: content,
            userId: userId,
            createdAt: new Date()
          });
    
          // Get the ID of the newly inserted post
          const postId = result.insertId;
    
          // Send notifications to all users using Firebase Cloud Messaging
          const users = await db.query('SELECT id, devise_token FROM User');
          const registrationTokens = users.map((user: any) => user.devise_token);
    
          if (registrationTokens.length > 0) {
            const message = {
              notification: {
                title: 'New Post Created',
                body: `A new post has been created.`,
              },
              tokens: registrationTokens,
            };
    
            await admin.messaging().sendMulticast(message);
          }
          return result;
=======

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
>>>>>>> c916f94fdf3aa670f29d3ca0e2208ace84db1a83
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
<<<<<<< HEAD
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
=======
>>>>>>> c916f94fdf3aa670f29d3ca0e2208ace84db1a83

}

export default new PostRepository();
