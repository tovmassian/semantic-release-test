import semanticRelease from 'semantic-release';

async function getNextVersion() {
  const result = await semanticRelease(
    {
      branches: ['main'],
      repositoryUrl: 'https://github.com/tovmassian/semantic-release-test.git',
      plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
      ],
      dryRun: true,
    },
    {
      cwd: process.cwd(),
      env: { ...process.env, CI: true },
    }
  );

  console.log(
    result
      ? `VERSION_OUTPUT=${result.nextRelease.version}`
      : 'No release needed.'
  );
}

getNextVersion().catch(console.error);
