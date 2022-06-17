import { zodResolver } from "@hookform/resolvers/zod";
import {
  Group,
  Indicator,
  Stack,
  Tooltip,
  Text,
  Space,
  Button,
} from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import { FaQuestion } from "react-icons/fa";
import { z } from "zod";
import {
  ALLOW_STUDENTS_TO_ADD_OR_REMOVE_GROUP_MEMBERS,
  ALLOW_STUDENTS_TO_CREATE_GROUPS,
  ALLOW_STUDENTS_TO_DELETE_GROUPS,
  ALLOW_STUDENTS_TO_JOIN_GROUPS,
  ALLOW_STUDENTS_TO_LEAVE_GROUPS,
  ALLOW_STUDENTS_TO_MODIFY_GROUP_NAME,
  DESCRIPTION,
  IS_PUBLISHED,
  MILESTONE_ALIAS,
  NAME,
  SHOW_GROUP_MEMBERS_NAMES,
} from "../constants";
import { useResolveError } from "../utils/error-utils";
import { handleSubmitForm } from "../utils/form-utils";
import toastUtils from "../utils/toast-utils";
import SwitchField from "./switch-field";
import TextField from "./text-field";
import TextareaField from "./textarea-field";

const schema = z.object({
  [NAME]: z.string().trim().min(1, "Please enter a course name"),
  [DESCRIPTION]: z.string().trim(),
  [MILESTONE_ALIAS]: z.string().trim(),
  [IS_PUBLISHED]: z.boolean(),
  [SHOW_GROUP_MEMBERS_NAMES]: z.boolean(),
  [ALLOW_STUDENTS_TO_MODIFY_GROUP_NAME]: z.boolean(),
  [ALLOW_STUDENTS_TO_CREATE_GROUPS]: z.boolean(),
  [ALLOW_STUDENTS_TO_DELETE_GROUPS]: z.boolean(),
  [ALLOW_STUDENTS_TO_JOIN_GROUPS]: z.boolean(),
  [ALLOW_STUDENTS_TO_LEAVE_GROUPS]: z.boolean(),
  [ALLOW_STUDENTS_TO_ADD_OR_REMOVE_GROUP_MEMBERS]: z.boolean(),
});

type CourseCreationFormProps = z.infer<typeof schema>;

const DEFAULT_VALUES: CourseCreationFormProps = {
  name: "",
  description: "",
  milestoneAlias: "",
  isPublished: false,
  showGroupMembersNames: false,
  allowStudentsToModifyGroupName: false,
  allowStudentsToCreateGroups: false,
  allowStudentsToDeleteGroups: false,
  allowStudentsToJoinGroups: false,
  allowStudentsToLeaveGroups: false,
  allowStudentsToAddOrRemoveGroupMembers: false,
};

type Props = {
  onSuccess?: () => void;
};

function CourseCreationForm({ onSuccess }: Props) {
  const methods = useForm<CourseCreationFormProps>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });
  const resolveError = useResolveError();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formData: CourseCreationFormProps) => {
    if (isSubmitting) {
      return;
    }

    console.log(formData);

    toastUtils.success({
      message: "The new course has been created successfully.",
    });
    onSuccess?.();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmitForm(handleSubmit(onSubmit), resolveError)}
        autoComplete="off"
      >
        <Stack>
          <Text size="lg" weight={500}>
            Course Details
          </Text>

          <TextField
            name={NAME}
            label="Course Name"
            autoFocus
            data-autofocus
            required
          />

          <TextareaField
            name={DESCRIPTION}
            label="Course Description"
            autosize
            minRows={3}
            maxRows={10}
          />

          <TextField
            name={MILESTONE_ALIAS}
            label="Milestone Alias"
            description="Another name for milestone. This alias will be displayed in place of 'milestone'."
            placeholder="E.g. iteration"
          />

          <Space />

          <Group spacing="lg" position="apart">
            <Indicator
              size={18}
              color="gray"
              offset={-2}
              label={
                <Tooltip
                  label={
                    <Text size="xs">
                      Students can view and access this course via{" "}
                      <strong>My Courses</strong>.
                    </Text>
                  }
                  withArrow
                  placement="start"
                  transition="pop-top-left"
                  transitionDuration={300}
                  wrapLines
                  width={200}
                >
                  <FaQuestion size={8} />
                </Tooltip>
              }
            >
              <Text<"label"> size="sm" htmlFor={IS_PUBLISHED} component="label">
                Publish Course
              </Text>
            </Indicator>
            <SwitchField
              name={IS_PUBLISHED}
              id={IS_PUBLISHED}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Text size="lg" weight={500}>
            Group Settings
          </Text>

          <Group spacing="lg" position="apart">
            <Indicator
              size={18}
              color="gray"
              offset={-2}
              label={
                <Tooltip
                  label={
                    <Text size="xs">
                      Students can view the group members in other groups.
                    </Text>
                  }
                  withArrow
                  placement="start"
                  transition="pop-top-left"
                  transitionDuration={300}
                  wrapLines
                  width={200}
                >
                  <FaQuestion size={8} />
                </Tooltip>
              }
            >
              <Text<"label">
                size="sm"
                htmlFor={SHOW_GROUP_MEMBERS_NAMES}
                component="label"
              >
                Make group members public
              </Text>
            </Indicator>
            <SwitchField
              name={SHOW_GROUP_MEMBERS_NAMES}
              id={SHOW_GROUP_MEMBERS_NAMES}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Group spacing="lg" position="apart">
            <Indicator
              size={18}
              color="gray"
              offset={-2}
              label={
                <Tooltip
                  label={
                    <Text size="xs">
                      Students can change the names of the groups they are in.
                    </Text>
                  }
                  withArrow
                  placement="start"
                  transition="pop-top-left"
                  transitionDuration={300}
                  wrapLines
                  width={200}
                >
                  <FaQuestion size={8} />
                </Tooltip>
              }
            >
              <Text<"label">
                size="sm"
                htmlFor={ALLOW_STUDENTS_TO_MODIFY_GROUP_NAME}
                component="label"
              >
                Students can modify group names
              </Text>
            </Indicator>
            <SwitchField
              name={ALLOW_STUDENTS_TO_MODIFY_GROUP_NAME}
              id={ALLOW_STUDENTS_TO_MODIFY_GROUP_NAME}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Group spacing="lg" position="apart">
            <Text<"label">
              size="sm"
              htmlFor={ALLOW_STUDENTS_TO_CREATE_GROUPS}
              component="label"
            >
              Students can create groups
            </Text>
            <SwitchField
              name={ALLOW_STUDENTS_TO_CREATE_GROUPS}
              id={ALLOW_STUDENTS_TO_CREATE_GROUPS}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Group spacing="lg" position="apart">
            <Indicator
              size={18}
              color="gray"
              offset={-2}
              label={
                <Tooltip
                  label={
                    <Text size="xs">
                      Students can disband groups for which they are in.
                    </Text>
                  }
                  withArrow
                  placement="start"
                  transition="pop-top-left"
                  transitionDuration={300}
                  wrapLines
                  width={200}
                >
                  <FaQuestion size={8} />
                </Tooltip>
              }
            >
              <Text<"label">
                size="sm"
                htmlFor={ALLOW_STUDENTS_TO_DELETE_GROUPS}
                component="label"
              >
                Students can delete groups
              </Text>
            </Indicator>
            <SwitchField
              name={ALLOW_STUDENTS_TO_DELETE_GROUPS}
              id={ALLOW_STUDENTS_TO_DELETE_GROUPS}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Group spacing="lg" position="apart">
            <Text<"label">
              size="sm"
              htmlFor={ALLOW_STUDENTS_TO_JOIN_GROUPS}
              component="label"
            >
              Students can join groups
            </Text>
            <SwitchField
              name={ALLOW_STUDENTS_TO_JOIN_GROUPS}
              id={ALLOW_STUDENTS_TO_JOIN_GROUPS}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Group spacing="lg" position="apart">
            <Text<"label">
              size="sm"
              htmlFor={ALLOW_STUDENTS_TO_LEAVE_GROUPS}
              component="label"
            >
              Students can leave groups
            </Text>
            <SwitchField
              name={ALLOW_STUDENTS_TO_LEAVE_GROUPS}
              id={ALLOW_STUDENTS_TO_LEAVE_GROUPS}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Group spacing="lg" position="apart">
            <Indicator
              size={18}
              color="gray"
              offset={-2}
              label={
                <Tooltip
                  label={
                    <Text size="xs">
                      Students can add/remove group members for groups they are
                      in.
                    </Text>
                  }
                  withArrow
                  placement="start"
                  transition="pop-top-left"
                  transitionDuration={300}
                  wrapLines
                  width={200}
                >
                  <FaQuestion size={8} />
                </Tooltip>
              }
            >
              <Text<"label">
                size="sm"
                htmlFor={ALLOW_STUDENTS_TO_ADD_OR_REMOVE_GROUP_MEMBERS}
                component="label"
              >
                Students can add/remove group members
              </Text>
            </Indicator>
            <SwitchField
              name={ALLOW_STUDENTS_TO_ADD_OR_REMOVE_GROUP_MEMBERS}
              id={ALLOW_STUDENTS_TO_ADD_OR_REMOVE_GROUP_MEMBERS}
              onLabel="Yes"
              offLabel="No"
              size="md"
            />
          </Group>

          <Space />

          <Group position="right">
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  );
}

export default CourseCreationForm;
