import { getConnection } from "typeorm";
import User from "../../db/entities/user.entity";

export const UserSeed = async () => {
  return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      username: "admin",
      email: "admin@admin.com",
      role_id: 2,
      password: "$2y$10$Hb1KgML/IeaGIwB9rgBJ1OW7pyRx6kHIZC.7FyYwUiPHvWuBO21s6",
    })
    .execute();
};
