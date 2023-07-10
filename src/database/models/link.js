import { EntitySchema } from "typeorm";

const Link = new EntitySchema({
  name: "Link",
  tableName: "links",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    slug: {
      unique: true,
      type: "varchar",
      length: 128,
    },
    original: {
      type: "text",
    },
    filePath: {
      type: "text",
      nullable: true,
    },
    expiredAt: {
      type: "datetime",
      nullable: true
    },
    createdAt: {
      default: () => "CURRENT_TIMESTAMP",
      type:"datetime"
    },
    userIp: {
      type: "varchar",
      length: 255
    }
  },
});

export { Link };
