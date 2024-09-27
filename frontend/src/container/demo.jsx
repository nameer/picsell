import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Demo = () => {
  const scrollToVideo = () => {
    const section = document.getElementById('demoVideo');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex w-full h-lvh flex-col ">
      <AppBar
        position="static"
        sx={{ position: 'fixed', top: 0, zIndex: 1000 }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid gray',
            backgroundColor: 'white',
            height: 90
          }}
        >
          <div className="flex">
            <div className="text-4xl font-bold text-black ml-5 font-serif ">
              EverNote
            </div>
            <div className="ml-16 mt-1">
              <Button
                color="inherit"
                sx={{
                  color: 'black',
                  textTransform: 'none',
                  fontSize: 15,
                  fontWeight: 600
                }}
              >
                Why Evernote
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: 'black',
                  textTransform: 'none',
                  fontSize: 15,
                  fontWeight: 600
                }}
              >
                Solutions
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: 'black',
                  textTransform: 'none',
                  fontSize: 15,
                  fontWeight: 600
                }}
              >
                Explore
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: 'black',
                  textTransform: 'none',
                  fontSize: 15,
                  fontWeight: 600
                }}
              >
                Pricing
              </Button>
              <Button
                color="inherit"
                onClick={scrollToVideo}
                sx={{
                  color: 'black',
                  textTransform: 'none',
                  fontSize: 15,
                  fontWeight: 600
                }}
              >
                Demo
              </Button>
            </div>
          </div>
          <div className="flex">
            <Button
              color="inherit"
              sx={{
                color: 'black',
                fontSize: 15,
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'black',
                border: '1px solid black',
                textTransform: 'none',
                marginLeft: 3,
                width: 120
              }}
            >
              Download
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'black',
                border: '1px solid black',
                textTransform: 'none',
                marginLeft: 3,
                width: 120,
                backgroundColor: '#00A82D',
                color: 'white'
              }}
            >
              Start for free
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center w-full mt-52 flex-col">
          <div className="text-7xl font-medium font-serif">What will you</div>
          <div className="text-7xl font-medium font-serif">achieve today</div>
        </div>
        <div className="mt-7 flex justify-center">
          <div className="mt-7 font-normal text-3xl max-w-[700px]">
            Remember everything and tackle any project with your notes, tasks,
            and schedule all in one place.
          </div>
        </div>
        <div className="mt-7 flex justify-center">
          <Button
            color="inherit"
            sx={{
              color: 'black',
              border: '1px solid black',
              textTransform: 'none',
              width: 300,
              height: 70,
              backgroundColor: '#00A82D',
              color: 'white',
              fontSize: 20,
              marginTop: 5
            }}
          >
            Get Evernote Free
          </Button>
        </div>
        <div className="flex justify-evenly my-28 ">
          <div className="flex flex-col max-w-[270px]">
            <div className="text-2xl font-semibold font-serif">
              Work anywhere
            </div>
            <div className="text-lg font-normal mt-3 ">
              Keep important info handy—your notes sync automatically to all
              your devices.
            </div>
          </div>
          <div className="flex flex-col max-w-[270px]">
            <div className="text-2xl font-semibold font-serif">
              Remember everything
            </div>
            <div className="text-lg font-normal mt-3 ">
              Make notes more useful by adding text, images, audio, scans, PDFs,
              and documents.
            </div>
          </div>
          <div className="flex flex-col max-w-[270px]">
            <div className="text-2xl font-semibold font-serif">
              Turn to-do into done
            </div>
            <div className="text-lg font-normal mt-3 ">
              Bring your notes, tasks, and schedules together to get things done
              more easily.
            </div>
          </div>
          <div className="flex flex-col max-w-[270px]">
            <div className="text-2xl font-semibold font-serif">
              Find things fast
            </div>
            <div className="text-lg font-normal mt-3 ">
              Get what you need, when you need it with powerful and flexible
              search capabilities.
            </div>
          </div>
        </div>
        <div id="demoVideo" className="w-full flex justify-center mb-10">
          <iframe
            width="1011px"
            height="569px"
            src="http://localhost:3000/chat"
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
