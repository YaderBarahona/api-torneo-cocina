import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Chef",
  tableName: "chefs",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "text", nullable: false },
    specialty: { type: "text", nullable: false },
    experienceYears: { type: "int", nullable: false },
  },
});
