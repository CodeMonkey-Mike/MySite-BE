import {
  Resolver,
  Query,
  FieldResolver,
  ObjectType,
  Field,
  Mutation,
  Arg,
} from "type-graphql";
import { FieldError } from "../../utils/fieldError";
import Processes from "../../db/entities/processes.entity";
import ProcessesTypes from "./types";
import { getConnection } from "typeorm";

@ObjectType()
class ProcessesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Processes], { nullable: true })
  processes?: Processes[];
}

@Resolver(Processes)
export class ProcessesResolver {
  @FieldResolver(() => String)

  // Get processes
  @Query(() => ProcessesResponse, { nullable: true })
  async getProcesses(): Promise<ProcessesResponse> {
    const processes = await Processes.find({
      order: {
        sequence: "ASC",
      },
    });
    return { processes };
  }

  // create new process
  @Mutation(() => ProcessesResponse)
  async createProcess(
    @Arg("options") options: ProcessesTypes
  ): Promise<ProcessesResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Processes)
        .values(options)
        .returning("*")
        .execute();
      const processes = await Processes.find();
      return { processes };
    } catch (err) {
      throw new Error(err);
    }
  }
  // delete new process
  @Mutation(() => ProcessesResponse)
  async deleteProcess(@Arg("id") id: number) {
    const process = await Processes.find({
      where: {
        id: id,
      },
    });
    await Processes.remove(process);
    const processes = await Processes.find();
    return { processes };
  }
  // update process
  @Mutation(() => ProcessesResponse)
  async updateProcess(@Arg("options") options: ProcessesTypes) {
    await Processes.update(
      {
        id: options.id,
      },
      { ...options }
    );
    const processes = await Processes.find();
    return { processes };
  }
  @Mutation(() => ProcessesResponse)
  async bulkUpdateProcesses(
    @Arg("options", () => [ProcessesTypes]) options: ProcessesTypes[]
  ) {
    options.forEach(async (process: ProcessesTypes) => {
      const oldProcess = await Processes.findOneOrFail(process.id);
      Object.assign(oldProcess, process);
      await oldProcess.save();
    });

    const processes = await Processes.find();
    return { processes };
  }
}
