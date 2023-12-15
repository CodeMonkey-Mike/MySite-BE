import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

class MigrationUtil {
  public static getIDColumn(isNumber?: boolean): TableColumnOptions[] {
    const columns: TableColumnOptions[] = [];
    columns.push({
      name: "id",
      type: isNumber ? "int" : "varchar",
      isPrimary: true,
      isNullable: false,
      isGenerated: true,
      generationStrategy: isNumber ? "increment" : "uuid",
    });

    return columns;
  }

  public static getVarCharColumn({
    name = "",
    length = "255",
    isPrimary = false,
    isNullable = false,
    isUnique = false,
    defaultValue = null,
    type = "varchar",
  }): TableColumnOptions {
    return {
      name,
      length,
      isPrimary,
      isNullable,
      isUnique,
      default: `'${defaultValue}'`,
      type,
    };
  }

  public static getTextColumn({
    name = "",
    isNullable = false,
    isUnique = false,
    defaultValue = null,
    type = "text",
  }): TableColumnOptions {
    return {
      name,
      isNullable,
      isUnique,
      default: `'${defaultValue}'`,
      type,
    };
  }

  public static getNumberColumn({
    name = "",
    isPrimary = false,
    isNullable = false,
    isUnique = false,
  }): TableColumnOptions {
    return {
      name,
      isPrimary,
      isNullable,
      isUnique,
      type: "integer",
    };
  }
}
export default MigrationUtil;
