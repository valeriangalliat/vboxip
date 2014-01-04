import System;

function help(name) {
  print('Launches a SSH session on a virtual machine.');
  print('');
  print(name, ' user name [num]');
  print('');
  print('  user        SSH user (must have the same password).');
  print('  name        Virtual machine name.');
  print('  [num]       Network interface number (0 by default).');
}

function parseArgs(args) {
  if (args.length > 1 && args[1] === '/?') {
    help(args[0]);
    throw 0;
  }

  if (args.length < 3) {
    help(args[0]);
    throw 1;
  }

  var user = args[1];
  var name = args[2];
  var num = 0;



  if (args.length > 3) {
    num = args[3];
    
    if (!/^0|1|2|3$/.test(num)) {
      print('The interface number must be between 0 and 3 (included).');
      throw 2;
    }

    num = +num;
  }

  return {user: user, name: name, num: num};
}

function argsToString(args) {
  for (var i = 0, len = args.length; i < len; i++) {
    args[i] = '"' + args[i].replace('"', '""') + '"';
  }

  return args.join(' ');
}

function invoke(program, args) {
  var process = new System.Diagnostics.Process();
  process.StartInfo.UseShellExecute = false;
  process.StartInfo.RedirectStandardOutput = true;
  process.StartInfo.FileName = program;
  process.StartInfo.Arguments = argsToString(args);
  process.Start();

  var output = process.StandardOutput.ReadToEnd();
  process.WaitForExit();
  return output;
}

function start(program, args) {
  var process = new System.Diagnostics.Process();
  process.StartInfo.FileName = program;
  process.StartInfo.Arguments = argsToString(args);
  process.Start();
}

function trim(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function getBoxIp(name, num) {
  var output = invoke('\\Program Files\\Oracle\\VirtualBox\\VBoxManage.exe', [
    'guestproperty',
    'get',
    name,
    '/VirtualBox/GuestInfo/Net/' + num + '/V4/IP'
  ]);

  var matches = trim(output).match(/^Value: ([0-9\.]+)$/);

  if (matches === null) {
    return null;
  }

  return matches[1];
}

function main(args) {
  var params = null;

  try {
    params = parseArgs(args);
  } catch (e) {
    return e;
  }

  var ip = getBoxIp(params.name, params.num);

  if (ip === null) {
    print('Unable to get the IP.');
    return 3;
  }

  start('putty.exe', ['-pw', params.user, params.user + '@' + ip]);
}

System.Environment.Exit(main(System.Environment.GetCommandLineArgs()));
