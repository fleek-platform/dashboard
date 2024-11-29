import type { ProjectQuery, ProjectsQuery } from '@/generated/graphqlClient';

export type Project = Pick<ProjectQuery['project'], 'id' | 'name' | 'avatar'>;

export type ProjectList = ProjectsQuery['projects']['data'];
