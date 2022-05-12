import { prisma } from '../../../prisma/prisma-client';


export const getAllTasksInMilestoneQuery = async (mileStoneId: number) => {
  const allTasks = await prisma.milestone.findMany({
    where: {
      id: mileStoneId,
    },
    select: {
      tasks: {
        select: {
          title: true,
          description: true,
          status: true,
          deadline: true,
          tags: {
            select: {
              label: true,
              color: true,
            },
          },
        },
      },
    },
  });

  if (!allTasks) return null;
  return allTasks;
};


export const createMilestoneQuery = async (
  title: string,
  project_id: number
) => {
  const milestone = await prisma.milestone.create({
    data: {
      project_id: project_id,
      title: title,
    },
  });

  if (!milestone) throw new Error();

  return milestone;
};
