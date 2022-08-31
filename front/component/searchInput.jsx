import { Button, createStyles, Grid, Input } from '@mantine/core';
import { IconSearch, IconTruckDelivery } from '@tabler/icons';
import { useForm } from 'react-hook-form';

const useStyles = createStyles((theme) => ({
  searchInput: {
    width: '500px',
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  idt: {
    marginLeft: '10px',
    cursor: 'pointer',
    marginTop: '5px',
  },
}));

export default function SearchInput() {
  const { classes, theme, cx } = useStyles();
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const handleSubmition = async (q) => {};

  return (
    <>
      <form method="post">
        <Input.Wrapper>
          <Grid>
            <Grid.Col
              span={10}
              sx={() => ({
                display: 'flex',
              })}
            >
              <Input
                type={'search'}
                width={400}
                size={'sm'}
                name={'q'}
                {...register('q', {
                  required: true,
                })}
                className={classes.searchInput}
                autoComplete={'off'}
                icon={<IconSearch size={18} />}
              />
              <IconTruckDelivery
                size={25}
                className={classes.idt}
                color={'indigo'}
                onClick={handleSubmit(
                  (data, e) => {
                    handleSubmition(data);
                  },
                  (errs) => {},
                )}
              />
            </Grid.Col>
          </Grid>
        </Input.Wrapper>
      </form>
    </>
  );
}
